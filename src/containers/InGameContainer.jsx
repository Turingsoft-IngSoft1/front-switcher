import React, { useEffect, useState, useContext } from 'react';
import Game from '../components/Game.jsx';
import { GameContext } from '../contexts/GameContext.jsx';

export default function InGameContainer (){
    let currentPlayer = 0;

    const {idGame, setIdGame,
           players, setPlayers,
           currentTurn,setCurrentTurn,
           board, setBoard,
           figureCards, setFigureCards, 
           movCards, setMovCards, 
           turnPlayer, setTurnPlayer} = useContext(GameContext);

    const passTurn = async (turnData) => {
        const response = await fetch (
            'http://127.0.0.1:8000/skip_turn',
            {
                method : 'POST',
                headers : {'Content-Type' : 'application/JSON'},
                body: JSON.stringify(turnData),
            }
        );
        //no estoy seguro de si puede haber varios casos de error
        if (!response.ok){
            throw new Error('Error al intentar pasar el turno');
        }

        //nos aseguramos que este siempre en el array con el modulo
        currentPlayer = (currentPlayer + 1) % players.length;
        setTurnPlayer(players[currentPlayer]);

    }

    //esta wea no se puede mockear tan facil, siempre se debe pasar el turno a un ID valido
    const passTurnMock = () => {
        currentPlayer = (currentPlayer + 1) % players.length;
        //le pasamos el id del wachin al que le toca el siguiente turno
        setTurnPlayer(players[currentPlayer]);
        console.log("index del jugador que tiene el turno:" + currentPlayer);
        console.log("id del jugador: " + players[currentPlayer]);
    }
    return <Game  onPassTurn = {passTurnMock}/>;
}