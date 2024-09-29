import React, { useContext, useEffect } from 'react';
import Lobby from '../components/Lobby.jsx';
import { GameContext } from '../contexts/GameContext.jsx';


export default function LobbyContainer () {
    const {fase, setFase} = useContext(GameContext);
    const startGame = async (gameData) => {
        const response = await fetch (
            'http://127.0.0.1:8000/start_game',
            {
                method : 'POST',
                headers : {'Content-Type' : 'application/JSON',},
                body : JSON.stringify(gameData),
            }
        );

        if (!response.ok){
            throw new Error('Error al iniciar la partida');
        }

        setFase('in-game');
    }

    const startGameMock = () => {
        setFase('in-game');
    }

    return (<Lobby onStartGame = {startGameMock}/>);
}