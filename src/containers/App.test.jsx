import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App.jsx";
import { GameContext } from '../contexts/GameContext.jsx';
import { ChatWebSocketContext, WebSocketContext } from '../contexts/WebSocketContext.jsx';
import { describe, expect, it, vi } from "vitest";
import "../setupTests.js";

const mockContextValues = {
    setIdGame: vi.fn(),
    setIdPlayer: vi.fn(),
    winner: "false", 
    setWinner: vi.fn(),
    fase: "inicial",
    idPlayer: 1,
    namePlayer: "Jugador1",
    players: [{ id: 1, name: 'Jugador1' }],
    idGame: 123,
    setInfoPlayers: vi.fn(),
    turnPlayer: 1,
    playerTurns: [],
    board: Array(36).fill("dark"),
    setBoard: vi.fn(),
    setPlayers: vi.fn(),
    setPlayersTurns: vi.fn(),
    setPlayersNames: vi.fn(),
};

const mockWSContextValues = {
    shouldConnect: true,
    setShouldConnect: vi.fn(),
}

const mockChatContextValues = {
    setShouldConnectChat: vi.fn(),
    shouldConnectChat: vi.fn()
}

beforeEach(() => {
    // Crear un elemento root simulado en el DOM
    const root = document.createElement('div');
    root.id = 'root';
    root.style = {}; // Mockear el objeto style para evitar el error
    document.body.appendChild(root);
  });

describe("App Component", () => {
    it("renders the Join Button component", () => {
        render(
            <GameContext.Provider value={mockContextValues}>
                <WebSocketContext.Provider value={mockWSContextValues}>
                    <ChatWebSocketContext.Provider value={mockChatContextValues}>
                        <App />
                    </ChatWebSocketContext.Provider>
                </WebSocketContext.Provider>
            </GameContext.Provider>
        );

        const newProfileButton = screen.getByText(/Crear/i);
        expect(newProfileButton).toBeInTheDocument();
    });

    it("renders the refresh button and triggers a state change to 'lobby'", async () => {
        // Hacemos un mock que inicializa 'fase' en 'inicial'
        const mockContextValuesWithFase = {
            ...mockContextValues,
            fase: "inicial", // Estado inicial de fase
            setFase: vi.fn(), // Mock de setFase para poder cambiar la fase
        };
    
        render(
            <GameContext.Provider value={mockContextValuesWithFase}>
                <WebSocketContext.Provider value={mockWSContextValues}>
                    <ChatWebSocketContext.Provider value={mockChatContextValues}>
                        <App />
                    </ChatWebSocketContext.Provider>
                </WebSocketContext.Provider>
            </GameContext.Provider>
        );
    
        // Verificamos que el botón 'Invitado' esté en la pantalla
        const invitedButton = screen.getByText(/invitado/i); 
        expect(invitedButton).toBeInTheDocument();
    
        // Simulamos un clic en el botón de 'Invitado'
        fireEvent.click(invitedButton);
    
        // Esperamos que se actualice el estado de 'fase' a 'lobby'
        await waitFor(() => {
            expect(mockContextValuesWithFase.setFase).toHaveBeenCalled();
            expect(mockContextValuesWithFase.fase).toBe("lobby"); // Verifica si la fase ha cambiado a 'lobby'
        });
    });
    
    
});
