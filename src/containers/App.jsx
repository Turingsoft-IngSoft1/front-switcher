import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateGame from '../components/CreateGame.jsx';
import CreateGameContainer from './CreateGameContainer.jsx'
import GameList from '../components/GameList.jsx';
import Lobby from '../components/Lobby.jsx';

function App() {
  const [fase, setFase] = useState('crear'); // 'crear', 'lobby', 'partida'
  const [idPartida, setIdPartida] = useState(null);

  const handleCreateGame = (id) => {
    setIdPartida(id);
    setFase('lobby');
  };

  return (
    <Container className="mt-5">
      {fase === 'crear' && (
        <Col>
          <Row md={12} className="mb-4">
            <div className="bg-light p-3 rounded">
              <GameList />
            </div>
          </Row>
          <Row md={12}>
            <div className="bg-dark text-white p-3 rounded">
              <CreateGameContainer onCreateGame={handleCreateGame} />
            </div>
          </Row>
        </Col>
      )}
      {fase === 'lobby' && (
        <Row>
          <Col>
              <Lobby />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
