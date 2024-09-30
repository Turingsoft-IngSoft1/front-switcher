// GameContext.jsx
/*
Creación de GameContext para la organización general del juego. Se debe tener 

    - una id de la partida asignada
    - un id de jugador
    - la cantidad de jugadores en la partida
    - el turno actual
    - la disposición del tablero
    - las cartas de movimientos actuales
    - las cartas de figuras actuales

*/
import React, { createContext, useState} from 'react';

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
    const [fase, setFase] = useState('crear')
    const [isOwner, setIsOwner] = useState(false);
    const [idPlayer, setIdPlayer] = useState(null); // id del jugador
    const [namePlayer, setNamePlayer] = useState(null); //nombre del jugador
    const [idGame, setIdGame] = useState(null); //id de la partida asignada
    const [players, setPlayers] = useState([]); // cantidad de jugadores en la partida
    const [currentTurn, setCurrentTurn] = useState(null); // turno actual
    const [board, setBoard] = useState(Array(36).fill("dark"));
    const [figureCards, setFigureCards] = useState([]); // cartas de movimiento actuales
    const [movCards, setMovCards] = useState([]); // cartas de figura actuales
    const [playersNames, setPlayersNames] = useState([]); // nombres de los jugadores
    const [playersTurns, setPlayersTurns] = useState([]); // turnos de los jugadores    
    const [turnPlayer, setTurnPlayer] = useState(null); // id del jugador que posee el turno actual
    const [winner, setWinner] = useState(false); // indicconsta si hay un ganador

    const value = {
        fase,
        setFase,
        isOwner,
        setIsOwner,
        idPlayer,
        namePlayer,
        setNamePlayer,
        setIdPlayer,
        idGame,
        setIdGame,
        players,
        setPlayers,
        currentTurn,
        setCurrentTurn,
        board,
        setBoard,
        figureCards,
        setFigureCards,
        movCards,
        setMovCards,
        playersNames,
        setPlayersNames,
        playersTurns,
        setPlayersTurns,
        turnPlayer,
        setTurnPlayer,
        winner,
        setWinner
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
