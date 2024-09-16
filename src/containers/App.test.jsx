import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the heading and game development message', () => {
    // Renderiza el componente App
    render(<App />);

    // Verifica que el título "Bienvenido a El Switcher" se renderiza
    const headingElement = screen.getByText(/Bienvenido a El Switcher/i);
    expect(headingElement).toBeInTheDocument();

    // Verifica que el mensaje "Juego en desarrollo..." se renderiza
    const paragraphElement = screen.getByText(/Juego en desarrollo/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
