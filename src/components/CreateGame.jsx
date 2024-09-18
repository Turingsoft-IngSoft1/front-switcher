import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CreateGame({ onCreateGame }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoId = 42; // TODO id partida
    onCreateGame(nuevoId);
  }

  return (
    <div className="form-partida">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" name="submitted-username" placeholder="Ingresa tu usuario" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGameTitle">
          <Form.Label>Nombre de la partida</Form.Label>
          <Form.Control type="text" name="submitted-gametitle" placeholder="Ingresa el nombre de la partida" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Partida
        </Button>
      </Form>
    </div>
  );
}
