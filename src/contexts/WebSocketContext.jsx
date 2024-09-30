import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GameContext } from '../contexts/GameContext.jsx';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const { idPlayer, idGame, setWinner, fase, playerId } = useContext(GameContext);
    const { lastMessage, readyState, sendMessage, getWebSocket, closeWebSocket } = useWebSocket(`ws://localhost:8000/ws/${idGame}/${idPlayer}`);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && idGame === 'crear' && fase === 'crear') {
            console.log('Fase cambiada a crear, desconectando WebSocket...');
            closeWebSocket();
        }
    }, [fase, idGame, readyState, closeWebSocket]);

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
                    console.log(`Player ${WinnerId} has won the game`);
                    console.log(`Player ${playerId} has won the game`);
                    setWinner(true);
                }
            }
        }
    }, [lastMessage, setPlayers, setWinner]);

    return (
        <WebSocketContext.Provider value={{ lastMessage, readyState, players, setPlayers, sendMessage, getWebSocket, closeWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);