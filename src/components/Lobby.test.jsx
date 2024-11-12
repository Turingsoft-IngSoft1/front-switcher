import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { GameContext } from '../contexts/GameContext.jsx';
import Lobby from './Lobby.jsx';
import { ChatWebSocketContext, WebSocketContext } from '../contexts/WebSocketContext.jsx';
import context from 'react-bootstrap/esm/AccordionContext.js';

// Mock de las funciones y valores del contexto
vi.mock('./Board.jsx', () => ({
    default: () => <div data-testid="mock-board"></div>,
  }));

vi.mock('./ExitButton.jsx', () => ({
    default: () => <div data-testid="mock-exit-button"></div>,
  }));
vi.mock('./PlayerBox.jsx', () => ({
    default: () => <div data-testid="mock-player-box"></div>,
  }));
vi.mock('./Chat.jsx', () => ({
    default: () => <div data-testid="mock-Chat"></div>,
}))


const mockContextValues = {
  setIdGame: vi.fn(),
  setIdPlayer: vi.fn(),
  winner: "false", // El estado inicial del ganador
  setWinner: vi.fn(),
  fase: "crear",
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
  setShouldConnect: vi.fn()
}

const mockChatContextValues = {
  setShouldConnectChat: vi.fn(),
  shouldConnectChat: vi.fn()
}

const startGameMock = () => {
    mockContextValues.fase = "in-game";
};
beforeEach(() => {
  // Crear un elemento root simulado en el DOM
  const root = document.createElement('div');
  root.id = 'root';
  root.style = {}; // Mockear el objeto style para evitar el error
  document.body.appendChild(root);
});

afterEach(() => {
  // Eliminar el elemento root después de cada test
  const root = document.getElementById('root');
  if (root) document.body.removeChild(root);
});

describe('Lobby', () => {
  it('debe renderizar correctamente el lobby con un solo jugador', () => {
    
    render(
      <GameContext.Provider value={mockContextValues}>
        <WebSocketContext.Provider value={mockWSContextValues}>
          <ChatWebSocketContext.Provider value={mockChatContextValues}>
            <Lobby onStartGame={startGameMock} />
          </ChatWebSocketContext.Provider>
        </WebSocketContext.Provider>
      </GameContext.Provider>
    );

    // Verifica si se muestra el nombre del jugador correctamente
    expect(screen.getByText('Jugador1')).toBeInTheDocument();

    // Verifica que el botón de "Iniciar Partida" no se muestre para un solo jugador
    expect(screen.queryByText('Iniciar Partida')).not.toBeInTheDocument();

  });

  it('debe mostrar el botón de "Iniciar Partida" si el jugador es el propietario', () => {
    const contextWithOwner = {
      ...mockContextValues,
      isOwner: true, // Simula que este jugador es el propietario
    };

    render(
      <GameContext.Provider value={contextWithOwner}>
      <WebSocketContext.Provider value={mockWSContextValues}>
        <ChatWebSocketContext.Provider value={mockChatContextValues}>
          <Lobby onStartGame={startGameMock} />
        </ChatWebSocketContext.Provider>
      </WebSocketContext.Provider>
    </GameContext.Provider>
    );

    // Verifica que el botón de "Iniciar Partida" está presente
    expect(screen.getByText('Iniciar Partida')).toBeInTheDocument();
  });

  it('debe manejar el clic en "Iniciar Partida" correctamente', () => {
    const onStartGameMock = vi.fn();
    const contextWithOwner = {
      ...mockContextValues,
      players: [{ id: 1, name: 'Jugador1' }, {id: 2, name: 'Jugador2'}],
      idGame: 123,
      isOwner: true,
    };

    render(
      <GameContext.Provider value={contextWithOwner}>
      <WebSocketContext.Provider value={mockWSContextValues}>
        <ChatWebSocketContext.Provider value={mockChatContextValues}>
          <Lobby onStartGame={onStartGameMock} />
        </ChatWebSocketContext.Provider>
      </WebSocketContext.Provider>
    </GameContext.Provider>
    );

    // Simula un clic en el botón "Iniciar Partida"
    fireEvent.click(screen.getByText('Iniciar Partida'));

    // Verifica que la función onStartGame fue llamada con los datos correctos
    expect(onStartGameMock).toHaveBeenCalledWith({ id_game: 123 });
  });

  it('debe mostrar el mensaje de cancelación si el ganador es "cancelado"', () => {
    const contextWithCancel = {
      ...mockContextValues,
      winner: "cancelado", // El estado de ganador es cancelado
    };

    render(
    <GameContext.Provider value={contextWithCancel}>
      <WebSocketContext.Provider value={mockWSContextValues}>
        <ChatWebSocketContext.Provider value={mockChatContextValues}>
          <Lobby onStartGame={vi.fn()} />
        </ChatWebSocketContext.Provider>
      </WebSocketContext.Provider>
    </GameContext.Provider>
    );

    // Verifica que se muestra el modal de cancelación
    expect(screen.getByText('Se cancelo la partida')).toBeInTheDocument();
  });
});
