import React, { useContext, useEffect } from 'react';
import Lobby from '../components/Lobby.jsx';
import { GameContext } from '../contexts/GameContext.jsx';


export default function LobbyContainer () {
    const {idGame, fase, setFase} = useContext(GameContext);
    const startGame = async (gameData) => {
        const response = await fetch (
            'http://127.0.0.1:8000/start_game/' + idGame,
            {
                method : 'POST',
                headers : {'Content-Type' : 'application/JSON',},
                body : JSON.stringify(gameData),
            }
        );

        if (!response.ok){
            throw new Error('Error al iniciar la partida');
        }

        //
        if (response.status == 409){
            console.log("No se puede iniciar la partida, no se cumple la capacidad minima")
        }

        setFase('in-game');
        console.log('Partida iniciada con exito');
    }

    const startGameMock = () => {
        setFase('in-game');
        console.log('Partida iniciada con exito by mock');
    }

    return (<Lobby onStartGame = {startGame}/>);
}