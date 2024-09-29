// CreateGame.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import CreateGame from './CreateGame';
import '@testing-library/jest-dom/extend-expect';

describe('CreateGame Component', () => {
  it('should call onCreateGame with correct data on form submission', async () => {
    const onCreateGameMock = jest.fn();
    
    render(<CreateGame onCreateGame={onCreateGameMock} />);
    
    // Simular la entrada en los campos del formulario
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu usuario'), { target: { value: 'player1' } });
    fireEvent.change(screen.getByPlaceholderText('Ingresa el nombre de la partida'), { target: { value: 'Game Title' } });
    fireEvent.change(screen.getByPlaceholderText('Mínimo'), { target: { value: 2 } });
    fireEvent.change(screen.getByPlaceholderText('Máximo'), { target: { value: 4 } });
    
    // Simular el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /crear partida/i }));
    
    // Verificar que onCreateGame fue llamado con los datos correctos
    expect(onCreateGameMock).toHaveBeenCalledWith({
      game_name: 'player1',
      owner_name: 'Game Title',
      min_player: '2',
      max_player: '4'
    });
  });
});
