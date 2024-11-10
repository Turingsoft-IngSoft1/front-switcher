import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { GameContext } from "../contexts/GameContext.jsx";
import {
    getPlayersInfo,
    getGameFigures,
    getBoard,
} from "../utils/gameServices.js";
import { getFiguresOnBoard } from "../services/cardServices.js";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [shouldConnect, setShouldConnect] = useState(false);
    const {
        board,
        setBlockedColor,
        players,
        playersTurns,
        playersNames,
        idPlayer,
        idGame,
        setWinner,
        fase,
        infoPlayers,
        setFiguresOnBoard,
        setBoard,
        setInfoPlayers,
        setFase,
        setTurnPlayer,
        setPlayers,
        setPlayersTurns,
        setPlayersNames,
    } = useContext(GameContext);
    const { lastMessage, readyState } = useWebSocket(
        `ws://localhost:8000/ws/${idGame}/${idPlayer}`,
        {},
        shouldConnect
    );

    useEffect(() => {
        if (readyState === ReadyState.OPEN && fase === "crear") {
            console.log("Fase cambiada a crear, desconectando WebSocket...");
            //TODO: Se puede usar para desconectar todo de golpe
        }
    }, [fase, readyState]);

    useEffect(() => {
        switch (readyState) {
            case ReadyState.CONNECTING:
                console.log("Conectando...");
                break;
            case ReadyState.OPEN:
                console.log("Conexión establecida");
                break;
            case ReadyState.CLOSING:
                console.log("Cerrando conexión...");
                break;
            case ReadyState.CLOSED:
                console.log("Conexión cerrada");
                break;
            case ReadyState.UNINSTANTIATED:
                console.log("WebSocket no instanciado");
                break;
            default:
                console.log("Estado desconocido");
                break;
        }
    }, [readyState]);
    WebSocketProvider;
    useEffect(() => {
        console.log("Received a new WebSocket message:", lastMessage);
        if (lastMessage !== null) {
            console.log("Received a new WebSocket message:", lastMessage.data);
            // Detecta si un jugador se fue de la partida
            if (lastMessage.data.includes("LEAVE")) {
                const [playerLeftId, action] = lastMessage.data.split(" ");
                if (action === "LEAVE") {
                    const newTurns = playersTurns.filter(
                        (turn, index) => players[index] != playerLeftId
                    );
                    const newNames = playersNames.filter(
                        (name, index) => players[index] != playerLeftId
                    );
                    const newPlayers = players.filter(
                        (player) => player != playerLeftId
                    );
                    setPlayersTurns(newTurns);
                    setPlayersNames(newNames);
                    setPlayers(newPlayers);

                    const newInfoPlayers = infoPlayers.filter(
                        (p) => p.id_user != playerLeftId
                    );
                    setInfoPlayers(newInfoPlayers);
                }
            }
            if (lastMessage.data.includes("WIN")) {
                const [WinnerId, action] = lastMessage.data.split(" ");
                if (action === "WIN") {
                    console.log(`Existe Ganador y es unico`);
                    setWinner(WinnerId);
                }
            }
            if (lastMessage.data.includes("REFRESH_BOARD")) {
                getBoard(idGame).then((newResponse) => {
                    setBoard(newResponse.board);
                    setBlockedColor(newResponse.blocked_color);
                });
            }
            if (lastMessage.data.includes("GAME_STARTED")) {
                const [action, turnId] = lastMessage.data.split(" ");
                setFase("in-game");
                setTurnPlayer(turnId);
                getGameFigures(idGame).then((data) => {
                    if (data) {
                        setInfoPlayers(data);
                    }
                });
                getFiguresOnBoard(idGame, idPlayer).then(
                    (newFiguresOnBoard) => {
                        if (newFiguresOnBoard) {
                            setFiguresOnBoard(newFiguresOnBoard);
                        }
                    }
                );
            }
            if (lastMessage.data.includes("REFRESH_FIGURES")) {
                getGameFigures(idGame).then((data) => {
                    console.log("NUEVAS FIGURAS!!!");
                    console.log(data);
                    if (data) {
                        setInfoPlayers(data);
                    }
                });
                getFiguresOnBoard(idGame, idPlayer).then(
                    (newFiguresOnBoard) => {
                        if (newFiguresOnBoard) {
                            setFiguresOnBoard(newFiguresOnBoard);
                        }
                    }
                );
            }
            if (lastMessage.data.includes("TURN")) {
                const [action, turnPlayerId] = lastMessage.data.split(" ");
                setTurnPlayer(turnPlayerId);
                getGameFigures(idGame).then((data) => {
                    console.log("NUEVAS FIGURAS!!!");
                    console.log(data);
                    if (data) {
                        setInfoPlayers(data);
                    }
                });
                getFiguresOnBoard(idGame, idPlayer).then(
                    (newFiguresOnBoard) => {
                        console.log("COLOCANDOFIGURAS");
                        if (newFiguresOnBoard) {
                            setFiguresOnBoard(newFiguresOnBoard);
                        }
                    }
                );
            }
            if (lastMessage.data.includes("JOIN")) {
                getPlayersInfo(idGame)
                    .then((data) => {
                        if (data && data.users_list) {
                            const usersList = data.users_list.map(
                                (user) => user.id
                            );
                            const playersTurns = data.users_list.map(
                                (user) => user.turn
                            );
                            const playersNames = data.users_list.map(
                                (user) => user.name
                            );
                            setPlayers(usersList);
                            setPlayersTurns(playersTurns);
                            setPlayersNames(playersNames);
                            setBoard(Array(36).fill("dark"));
                        } else {
                            console.error("users_list is undefined");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching players info:", error);
                    });
            }
            if (lastMessage.data.includes("MOVE")) {
                const parts = lastMessage.data
                    .replace("MOVE ", "")
                    .split(/[(),\s]+/)
                    .filter(Boolean);
                const pos1 = [parseInt(parts[0]), parseInt(parts[1])];
                const pos2 = [parseInt(parts[2]), parseInt(parts[3])];

                //de coords a index (1,2) => 9
                const newPos1 = pos1[0] * 6 + pos1[1];
                const newPos2 = pos2[0] * 6 + pos2[1];

                const newBoard = [...board];
                const aux = newBoard[newPos2];
                newBoard[newPos2] = newBoard[newPos1];
                newBoard[newPos1] = aux;

                setBoard(newBoard);

                getFiguresOnBoard(idGame, idPlayer).then(
                    (newFiguresOnBoard) => {
                        if (newFiguresOnBoard) {
                            setFiguresOnBoard(newFiguresOnBoard);
                        }
                    }
                );
            }
            if (lastMessage.data.includes("CANCELLED")) {
                console.log("Match has been cancelled, exiting...");
                setWinner("cancelado");
            }
        }
    }, [lastMessage]);

    return (
        <WebSocketContext.Provider value={{ shouldConnect, setShouldConnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const ChatWebSocketContext = createContext(null);

export const ChatWebSocketProvider = ({ children }) => {
    const [shouldConnectChat, setShouldConnectChat] = useState(false);
    const { idGame, idPlayer } = useContext(GameContext);
    const { lastMessage, readyState } = useWebSocket(
        `ws://localhost:8000/chat/${idGame}/${idPlayer}`,
        {},
        shouldConnectChat
    );

    useEffect(() => {
        switch (readyState) {
            case ReadyState.CONNECTING:
                console.log("Chat: Conectando...");
                break;
            case ReadyState.OPEN:
                console.log("Chat: Conexión establecida");
                break;
            case ReadyState.CLOSED:
                console.log("Chat: Conexión cerrada");
                break;
            default:
                console.log("Chat: Estado desconocido");
                break;
        }
    }, [readyState]);

    useEffect(() => {
        if (lastMessage !== null) {
            console.log("Chat message received:", lastMessage.data);
            // Handle chat messages here
            const [sender, ...messageParts] = lastMessage.data.split(':');
            const messageContent = messageParts.join(':').trim();
            const event = new CustomEvent('chatMessage', {
                detail: {
                    sender,
                    message: messageContent
                }
            });
            document.dispatchEvent(event);
            }
    }, [lastMessage]);

    return (
        <ChatWebSocketContext.Provider value={{ shouldConnectChat, setShouldConnectChat }}>
            {children}
        </ChatWebSocketContext.Provider>
    );
};