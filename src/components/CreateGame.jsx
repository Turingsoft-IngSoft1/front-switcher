import React, { useContext } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext.jsx";

export default function CreateGame({ onCreateGame }) {
    const { namePlayer, setNamePlayer, setBlockedColor, setBoard } = useContext(GameContext);
    const [username, setUsername] = useState("");
    const [gameTitle, setGameTitle] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const gameData = {
            game_name: gameTitle,
            owner_name: username,
            min_player: minPlayers,
            max_player: maxPlayers,
            password: password
        };
        setBlockedColor("default");
        setBoard(Array(36).fill("dark"));
        setNamePlayer(username);
        onCreateGame(gameData);
    };

    return (
        <div className="form-partida">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        minLength="3"
                        maxLength="20"
                        name="submitted-username"
                        placeholder="Ingresa tu usuario"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña (opcional)</Form.Label>
                    <Form.Control
                        type="password"
                        minLength="8"
                        maxLength="20"
                        name="submitted-password"
                        placeholder="Ingresa una contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGameTitle">
                    <Form.Label>Nombre de la partida</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        minLength="3"
                        maxLength="20"
                        name="submitted-gametitle"
                        placeholder="Ingresa el nombre de la partida"
                        onChange={(e) => setGameTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMinPlayers">
                    <Form.Label>Cantidad minima de jugadores</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min="2"
                        max="4"
                        name="submitted-minplayers"
                        placeholder="Mínimo"
                        onChange={(e) => setMinPlayers(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMaxPlayer">
                    <Form.Label>Cantidad máxima de jugadores</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min="2"
                        max="4"
                        name="submitted-maxplayers"
                        placeholder="Máximo"
                        onChange={(e) => setMaxPlayers(e.target.value)}
                    />
                </Form.Group>

                <Button id="crear-partida-btn" variant="primary" type="submit">
                    Crear Partida
                </Button>
            </Form>
        </div>
    );
}
