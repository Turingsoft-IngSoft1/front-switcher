import React, { useContext, useEffect } from 'react';
import Lobby from '../components/Lobby.jsx';
import { GameContext } from '../contexts/GameContext.jsx';

export default function LobbyContainer () {
    const {idPlayer, idGame, fase, playerTurns, setFase, setTurnPlayer, setPlayers, setPlayersTurns, setPlayersNames} = useContext(GameContext);
    //traete los jugadores
    const getPlayersInfo = () => {
        console.log(idGame);
        fetch('http://127.0.0.1:8000/active_players/' + idGame, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const usersList = data.users_list.map(user => user.id);
            const playersTurns = data.users_list.map(user => user.turn);
            const playersNames = data.users_list.map(user => user.name);
            setPlayers(usersList);
            setPlayersTurns(playersTurns);
            setPlayersNames(playersNames);

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    };

    useEffect(() => {
        getPlayersInfo();
    }, []);

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
        console.log(playerTurns);
        console.log('Partida iniciada con exito');
    }

    const startGameMock = () => {
        setFase('in-game');
        console.log('Partida iniciada con exito by mock');
    }

    return (       
            <Lobby onStartGame = {startGame}/>
        
    );
}