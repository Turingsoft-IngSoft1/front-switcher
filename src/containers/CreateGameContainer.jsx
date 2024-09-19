import React from 'react';
import CreateGame from '../components/CreateGame.jsx';

export default function CreateGameContainer({ onCreateGame }) {

  const createGame = async (gameData) => {
    try {
        //TODO: direccion de api
      const response = await fetch('/crearpartida', {
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
      const nuevoId = responseData.id;
      onCreateGame(nuevoId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createGameMock = (gameData) => {
    const idMock = 42;
    onCreateGame(idMock);
  }
  return <CreateGame onCreateGame={createGameMock} />;
}
