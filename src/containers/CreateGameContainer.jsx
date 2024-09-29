import React, { useContext, useEffect } from 'react';
import CreateGame from '../components/CreateGame.jsx';
import { GameContext } from '../contexts/GameContext.jsx';

export default function CreateGameContainer({ onCreateGame }) {
  const { idGame, idPlayer, players, fase, setIdGame, setIdPlayer, setPlayers, setFase} = useContext(GameContext);
  const createGame = async (gameData) => {
    try {
        //TODO: direccion de api
        const response = await fetch('http://127.0.0.1:8000/create_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la partida');
      }

      const responseData = await response.json();
      const newIdGame = responseData.id_game;
      const newIdPlayer = responseData.id_player;
      setIdGame(newIdGame);
      setIdPlayer(newIdPlayer);
      setPlayers([newIdPlayer]);
      setFase('lobby');
      setIsOwner(true);
      console.log('Partida creada con exito')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createGameMock = () => {
    setIdGame(111);
    setIdPlayer(42);
    setPlayers([42]);
    setFase('lobby');
    console.log('Partida (mockeada) creada con exito')
  }

  return <CreateGame onCreateGame={createGame} />;
}
