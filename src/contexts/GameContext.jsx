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


   Ej ----> infoPlayers: {
                    id: 219,
                    name: 'qsort',
                    figCards: ['fig01', 'fige02', 'fig11'],
                }
*/
import React, { createContext, useEffect, useState} from 'react';
import defaultBackground from '../styles/default_background.jpg';
import redBackground from '../styles/red_background.jpg';
import greenBackground from '../styles/green_background.jpg';
import blueBackground from '../styles/blue_background.jpg';
import yellowBackground from '../styles/yellow_background.jpg';

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
    const [fase, setFase] = useState("crear");
    const [isOwner, setIsOwner] = useState(false);
    const [idPlayer, setIdPlayer] = useState(null); // id del jugador
    const [namePlayer, setNamePlayer] = useState(null); //nombre del jugador
    const [idGame, setIdGame] = useState(null); //id de la partida asignada
    const [players, setPlayers] = useState([]); // cantidad de jugadores en la partida
    const [currentTurn, setCurrentTurn] = useState(null); // turno actual
    const [board, setBoard] = useState(Array(36).fill("dark"));
    const [figuresOnBoard, setFiguresOnBoard] = useState(null);
    const [figureCards, setFigureCards] = useState([]); // cartas de movimiento actuales
    const [movCards, setMovCards] = useState([]); // cartas de figura actuales
    const [playersNames, setPlayersNames] = useState([]); // nombres de los jugadores
    const [playersTurns, setPlayersTurns] = useState([]); // turnos de los jugadores
    const [infoPlayers, setInfoPlayers] = useState([]);
    const [turnPlayer, setTurnPlayer] = useState(null); // id del jugador que posee el turno actual
    const [selectedMovementCard, setSelectedMovementCard] = useState([
        null,
        null,
    ]); //tupla compuesta por el movimiento y el indice en el set de cartas
    const [selectedFigureCard, setSelectedFigureCard] = useState(null);
    const [figureTile, setFigureTile] = useState(null);
    const [selectedTiles, setSelectedTiles] = useState([]); //fichas seleccionadas por el jugador
    const [blockedColor, setBlockedColor] = useState('default'); //informacion sobre el color bloqueado (si no estamos in-game debe ser default)
    const [winner, setWinner] = useState('false'); // indicconsta si hay un ganador

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
        figuresOnBoard,
        setFiguresOnBoard,
        figureCards,
        setFigureCards,
        movCards,
        setMovCards,
        playersNames,
        setPlayersNames,
        infoPlayers,
        setInfoPlayers,
        playersTurns,
        setPlayersTurns,
        turnPlayer,
        setTurnPlayer,
        selectedMovementCard,
        setSelectedMovementCard,
        selectedFigureCard,
        setSelectedFigureCard,
        figureTile,
        setFigureTile,
        selectedTiles, setSelectedTiles,
        blockedColor,
        setBlockedColor,
        winner,
        setWinner,
    };

    //cambia el fondo de la app segun el color bloqueado
    useEffect ( () => {
        const backgrounds = {
            default : defaultBackground,
            red : redBackground,
            green : greenBackground,
            blue : blueBackground,
            yellow : yellowBackground,
        };

        const rootElement = document.getElementById('root');
        rootElement.style.backgroundImage = `url(${backgrounds[blockedColor]})`;

    }, [blockedColor]);


    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
};
