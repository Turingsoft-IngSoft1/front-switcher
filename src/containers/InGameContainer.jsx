import React, { useEffect, useState, useContext } from 'react';
import Game from '../components/Game.jsx';
import { GameContext } from '../contexts/GameContext.jsx';
import {getFiguresOnFinishTurn} from '../services/cardServices.js';

export default function InGameContainer (){
    let currentPlayer = 0;

    const {idPlayer, players, setTurnPlayer, setBoard, idGame, setSelectedTiles, setMovementCard} = useContext(GameContext);

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

        // Al pasar turno, obtener nuevas cartas
        getFiguresOnFinishTurn(idGame, idPlayer);
        setSelectedTiles([]);
        setMovementCard(null);
    }

    //esta wea no se puede mockear tan facil, siempre se debe pasar el turno a un ID valido
    const passTurnMock = () => {
        currentPlayer = (currentPlayer + 1) % players.length;
        //le pasamos el id del wachin al que le toca el siguiente turno
        setTurnPlayer(players[currentPlayer]);
        console.log("index del jugador que tiene el turno:" + currentPlayer);
        console.log("id del jugador: " + players[currentPlayer]);
    }

    const updateBoard = async () => {
        const response = await fetch (
            'http://127.0.0.1:8000/board_status/' + idGame,
            {
                method : 'GET',
                headers : {'Content-Type' : 'application/JSON'},
            }
        )

        if (!response.ok) {
            throw new Error('Error al obtener el estado del tablero');
        }

        const responseData = await response.json();
        const boardData = responseData.board;
        const newBoard = Array(36).fill(null);
        let index = 0;

        boardData.forEach(row => {
            row.forEach(cell => {
                if (cell === "B") {
                    newBoard[index] = "primary"; 
                } else if (cell === "R") {
                    newBoard[index] = "danger";  
                } else if (cell === "Y") {
                    newBoard[index] = "warning"; 
                } else if (cell === "G") {
                    newBoard[index] = "success"; 
                }

                index++;
            });
        });

        setBoard(newBoard);

        /* Acceder al response y setear el tablero */
        console.log("Se ha actualizado el tablero");

    }

    const updateBoardMock = () => {
        const jsonDataMock = {
            "1": "blue","2": "yellow","3": "blue","4": "blue","5": "green","6": "green",
            "7": "blue","8": "red","9": "green","10": "green","11": "blue","12": "red",
            "13": "yellow","14": "red","15": "blue","16": "red","17": "green","18": "green",
            "19": "yellow","20": "green","21": "green","22": "yellow","23": "green","24": "green",
            "25": "yellow","26": "red","27": "green","28": "green","29": "green","30": "blue",
            "31": "blue","32": "green","33": "red","34": "red","35": "green","36": "yellow"
          }

          const newBoard = Array(36).fill(null);
          Object.keys(jsonDataMock).forEach(key => {
            const index = parseInt(key) - 1   // "1" : board[0]
            if (jsonDataMock[key] == "blue"){
                newBoard[index] = "primary"
            }
            else if (jsonDataMock[key] == "red"){
                newBoard[index] = "danger"
            }
            else if (jsonDataMock[key] == "yellow") {
                newBoard[index] = "warning"
            }
            else if (jsonDataMock[key] == "green"){
                newBoard[index] = "success"
            }
            setBoard(newBoard)
          })
          
    }

    const ConfirmMovementMock = () => {
        setMovementCard(null);
        setSelectedTiles([]);
    }
    return <Game  onPassTurn = {passTurn} onUpdateBoard={updateBoard} onConfirmMovement={ConfirmMovementMock}/>;
}