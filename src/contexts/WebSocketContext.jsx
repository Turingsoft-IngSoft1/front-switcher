import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GameContext } from '../contexts/GameContext.jsx';
import {getPlayersInfo} from '../utils/fetches.jsx';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [shouldConnect, setShouldConnect] = useState(false);
    const { idPlayer, idGame, setWinner, fase, setFase, setTurnPlayer, setPlayers, setPlayersTurns, setPlayersNames} = useContext(GameContext);
    const { lastMessage, readyState, sendMessage, getWebSocket } = useWebSocket(`ws://localhost:8000/ws/${idGame}/${idPlayer}`, {
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
                break;const [WinnerId, action] = lastMessage.data.split(' ');
                if (action === 'WIN') {
                    console.log(`Existe Ganador y es unico`);
                    setWinner(true);
                }
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
        if (lastMessage !== null) {
            console.log('Mensaje recibido');
            // Detecta si un jugador se fue de la partida
            if (lastMessage.data.includes('LEAVE')) {
                const [playerLeftId, action] = lastMessage.data.split(' ');
                if (action === 'LEAVE') {
                    console.log(`Player ${playerLeftId} has left the game`);
                    setPlayers(prevPlayers => prevPlayers.filter(player => player !== playerLeftId));
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
                const[action, turnId] = lastMessage.data.split(' ');
                console.log(action);
                console.log("turnId" + turnId); 
                setFase('in-game');
                setTurnPlayer(turnId);
                getPlayersInfo();
            }
            if (lastMessage.data.includes('TURN')){
                const [action, turnPlayerId] = lastMessage.data.split(' ');
                console.log("TurnId BY SKIp" + turnPlayerId);
                console.log('Se actualizan los turnos');
                setTurnPlayer(turnPlayerId);
            }
            if (lastMessage.data.includes('JOIN')) {
                getPlayersInfo();
            }
        }
    }, [lastMessage, setPlayers, setWinner]);

    return (
        <WebSocketContext.Provider value={{ }}>
            {children}
        </WebSocketContext.Provider>
    );
};