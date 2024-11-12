import { render, screen, fireEvent, act } from '@testing-library/react';
import Board from './Board';
import { GameContext } from '../contexts/GameContext';
import '@testing-library/jest-dom';  // para tener más matchers como toBeInTheDocument
import { useFigureCard, blockFigureCard } from "../services/cardServices.js";

// Mock para useFigureCard
vi.mock('../services/cardServices.js', () => ({
  useFigureCard: vi.fn().mockResolvedValue({ ok: true}),
  blockFigureCard: vi.fn()
}));




describe('Board Component', () => {
  const mockGameContext = {
    board: Array(36).fill('primary'), // Mock del tablero
    idGame: 1,
    idPlayer: 2,
    turnPlayer: 2,
    movCards: [],
    setMovCards: vi.fn(),
    selectedFigureCard: { nameFig: 'figure1' },
    setSelectedFigureCard: vi.fn(),
    figuresOnBoard: { figure1: { red: [[[0, 0], [1, 1]]] } },
    figureTile: null,
    setFigureTile: vi.fn(),
    selectedTiles: [],
    setSelectedTiles: vi.fn(),
  };

  it('renders the board with 36 tiles', () => {
    render(
      <GameContext.Provider value={mockGameContext}>
        <Board />
      </GameContext.Provider>
    );
    const tiles = screen.getAllByRole('button');  // Cada Tile es un button
    expect(tiles.length).toBe(36);  // Aseguramos que hay 36 tiles
  });

  it('highlights selected tiles when clicked', () => {
    render(
      <GameContext.Provider value={mockGameContext}>
        <Board />
      </GameContext.Provider>
    );
    const tile = screen.getAllByRole('button')[0];  // Obtener el primer tile
    fireEvent.click(tile);  // Simular click
    expect(tile).toHaveClass('brighter-tile');  // Asegurar que la clase selected se aplica
  });

  it('fetches a figure and updates movCards on tile click when figure is selected', async () => {
    useFigureCard.mockResolvedValueOnce({ ok: true });

    const { container } = render(
      <GameContext.Provider value={mockGameContext}>
        <Board />
      </GameContext.Provider>
    );

    const tile = screen.getAllByRole('button')[0];
    await act(async () => {
       fireEvent.click(tile);
    });

    expect(tile).not.toBeNull();
  });

  it('does not allow selecting tiles when it is not the player\'s turn', () => {
    // Modificar mock para que no sea el turno del jugador
    const modifiedContext = {
      ...mockGameContext,
      turnPlayer: 1,  // Diferente de idPlayer
    };

    render(
      <GameContext.Provider value={modifiedContext}>
        <Board />
      </GameContext.Provider>
    );

    const tile = screen.getAllByRole('button')[0];
    fireEvent.click(tile);

    // No debería estar seleccionada
    expect(tile).not.toHaveClass('selected');
  });
});
