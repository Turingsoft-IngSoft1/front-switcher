import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GameContext } from '../contexts/GameContext.jsx';
import {getPlayersInfo} from '../utils/gameServices.js'

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [shouldConnect, setShouldConnect] = useState(false);
    const { idPlayer, idGame, setWinner, fase, setFase, setTurnPlayer, setPlayers, setPlayersTurns, setPlayersNames, players, playersTurns, playersNames} = useContext(GameContext);
    const { lastMessage, readyState } = useWebSocket(`ws://localhost:8000/ws/${idGame}/${idPlayer}`, {
    },
    shouldConnect);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && fase === 'crear') {
            console.log('Fase cambiada a crear, desconectando WebSocket...');
            //TODO: Se puede usar para desconectar todo de golpe
        }
    }, [fase, readyState]);


    useEffect(() => {
        switch (readyState) {
            case ReadyState.CONNECTING:
                console.log('Conectando...');
                break;
            case ReadyState.OPEN:
                console.log('Conexión establecida');
                break;
            case ReadyState.CLOSING:
                console.log('Cerrando conexión...');
                break;
            case ReadyState.CLOSED:
                console.log('Conexión cerrada');
                break;
            case ReadyState.UNINSTANTIATED:
                console.log('WebSocket no instanciado');
                break;
            default:
                console.log('Estado desconocido');
                break;
        }
    }, [readyState]);
    WebSocketProvider
    useEffect(() => {
        console.log('Received a new WebSocket message:', lastMessage);
        if (lastMessage !== null) {
            // Detecta si un jugador se fue de la partida
            if (lastMessage.data.includes('LEAVE')) {
                const [playerLeftId, action] = lastMessage.data.split(' ');
                if (action === 'LEAVE') {
                    const newTurns = playersTurns.filter((turn, index) => players[index] != playerLeftId)
                    const newNames = playersNames.filter((name, index) => players[index] != playerLeftId)
                    const newPlayers = players.filter(player => player != playerLeftId);
                    setPlayersTurns(newTurns);
                    setPlayersNames(newNames);
                    setPlayers(newPlayers, newTurns, newNames);
                }
            }
            if (lastMessage.data.includes('WIN')) {
                const [WinnerId, action] = lastMessage.data.split(' ');
                if (action === 'WIN') {
                    console.log(`Existe Ganador y es unico`);
                    setWinner(true);
                }
            }
            if (lastMessage.data.includes('GAME_STARTED')) {
                const [action, turnId] = lastMessage.data.split(' ');
                setFase('in-game');
                setTurnPlayer(turnId);

                getPlayersInfo(idGame);
            }
            if (lastMessage.data.includes('TURN')){
                const [action, turnPlayerId] = lastMessage.data.split(' ');
                setTurnPlayer(turnPlayerId);
            }
            if (lastMessage.data.includes('JOIN')) {
                getPlayersInfo(idGame).then(data => {
                    if (data && data.users_list) {
                        const usersList = data.users_list.map(user => user.id);
                        const playersTurns = data.users_list.map(user => user.turn);
                        const playersNames = data.users_list.map(user => user.name);
                        setPlayers(usersList);
                        setPlayersTurns(playersTurns);
                        setPlayersNames(playersNames);
                    } else {
                        console.error('users_list is undefined');
                    }
                }).catch(error => {
                    console.error('Error fetching players info:', error);
                });
            }
        }
    }, [lastMessage]);

    return (
        <WebSocketContext.Provider value={{ shouldConnect, setShouldConnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};