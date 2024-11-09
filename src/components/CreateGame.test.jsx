// CreateGame.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import CreateGame from "./CreateGame";
import { GameContext } from "../contexts/GameContext.jsx";
import "@testing-library/jest-dom";

describe("CreateGame Component", () => {
    it("should call onCreateGame with correct data on form submission", async () => {
        const onCreateGameMock = vi.fn();
        const setNamePlayerMock = vi.fn();

        const contextValue = {
            namePlayer: "player1",
            setNamePlayer: setNamePlayerMock
        };
        render(
            <GameContext.Provider value={contextValue}>
                <CreateGame onCreateGame={onCreateGameMock} />
            </GameContext.Provider>);

        // Simular la entrada en los campos del formulario
        fireEvent.change(screen.getByPlaceholderText("Ingresa tu usuario"), {
            target: { value: "player1" },
        });
        fireEvent.change(
            screen.getByPlaceholderText("Ingresa el nombre de la partida"),
            { target: { value: "Game Title" } }
        );
        fireEvent.change(screen.getByPlaceholderText("Mínimo"), {
            target: { value: 2 },
        });
        fireEvent.change(screen.getByPlaceholderText("Máximo"), {
            target: { value: 4 },
        });

        // Simular el envío del formulario
        fireEvent.click(screen.getByRole("button", { name: /crear partida/i }));

        // Verificar que onCreateGame fue llamado con los datos correctos
        expect(onCreateGameMock).toHaveBeenCalledWith({
            game_name: "Game Title",
            owner_name: "player1",
            min_player: "2",
            max_player: "4",
        });
    });
});
