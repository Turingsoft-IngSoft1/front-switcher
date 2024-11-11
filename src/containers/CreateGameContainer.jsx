import React, { useContext } from "react";
import CreateGame from "../components/CreateGame.jsx";
import { GameContext } from "../contexts/GameContext.jsx";
const isMock = import.meta.env.USE_MOCK;

export default function CreateGameContainer() {
    const {
        setIsOwner,
        idGame,
        idPlayer,
        players,
        fase,
        isInvited,
        setIdGame,
        setIdPlayer,
        setPlayers,
        setFase,
    } = useContext(GameContext);
    const createGame = async (gameData, profileId) => {
        try {
            const fetchDirection = isInvited
                ? `http://127.0.0.1:8000/create_game`
                : `http://127.0.0.1:8000/create_game?profile_id=${profileId}`;
            const response = await fetch(fetchDirection, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameData),
            });

            if (!response.ok) {
                throw new Error("Error al crear la partida");
            }

            const responseData = await response.json();
            const newIdGame = responseData.id_game;
            const newIdPlayer = responseData.id_player;
            setIdGame(newIdGame);
            setIdPlayer(newIdPlayer);
            setPlayers([newIdPlayer]);
            setFase("lobby");
            setIsOwner(true);
            console.log("Partida creada con exito");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const createGameMock = () => {
        setIdGame(111);
        setIdPlayer(42);
        setPlayers([42]);
        setFase("lobby");
        console.log("Partida (mockeada) creada con exito");
    };

    return <CreateGame onCreateGame={isMock ? createGameMock : createGame} />;
}
