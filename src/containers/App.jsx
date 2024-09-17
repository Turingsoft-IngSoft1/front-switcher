import { useState } from 'react'
import CreateGame from '../components/CreateGame.jsx'
import GameList from '../components/GameList.jsx'
import Lobby from '../components/Lobby.jsx'
import '../styles/App.css'

function App() {
  const [fase, setFase] = useState('crear'); // 'crear', 'lobby', 'partida'
  const [idPartida, setIdPartida] = useState(null);
  
  const handleCreateGame = (id) => {
    setIdPartida(id);
    setFase('lobby');
  };
  return (
    <div className="App">
      {fase === 'crear' && (
        <>
          <GameList />
          <CreateGame onCreateGame={handleCreateGame} />
        </>
      )}
      {fase === 'lobby' && <Lobby />}
    </div>
  );
}

export default App
