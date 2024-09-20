import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CreateGame({ onCreateGame }) {

  const [username, setUsername] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const gameData = {
      username,
      gameTitle,
      minPlayers: parseInt(minPlayers, 10),
      maxPlayers: parseInt(maxPlayers, 10),
    };

    onCreateGame(gameData);
  }

  return (
    <div className="form-partida">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Usuario</Form.Label>
          <Form.Control required type="text" minlength="3" maxlength="20" name="submitted-username" placeholder="Ingresa tu usuario" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGameTitle">
          <Form.Label>Nombre de la partida</Form.Label>
          <Form.Control required type="text" minlength="3" maxlength="20" name="submitted-gametitle" placeholder="Ingresa el nombre de la partida" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMinPlayers">
          <Form.Label>Cantidad minima de jugadores</Form.Label>
          <Form.Control required type="number" min="2" max="4" name="submitted-gametitle" placeholder="Mínimo" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMaxPlayer">
          <Form.Label>Cantidad máxima de jugadores</Form.Label>
          <Form.Control required type="number" min="2" max="4" name="submitted-gametitle" placeholder="Máximo" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Partida
        </Button>
      </Form>
    </div>
  );
}
