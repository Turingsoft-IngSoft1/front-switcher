import { useState, useEffect } from 'react'
import '../styles/App.css'
import JoinButton from '../components/JoinButton'
function App() {
  const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const fetchData = () => {
      fetch('http://127.0.0.1:8000/list_games', {
          headers: {
              'accept': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Assuming setData expects the games_list array
          setData(data.games_list);
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          setError(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Boton de unirse Test</h1>
      <div>
          {data ? (
            data.map((match, index) => (
              <div key={index}>
                <JoinButton selectedMatch={match} />
                <p/>
              </div>
            ))
          ) : (
            <span>Cargando...</span>
          )}
      </div>
    </>
  )
}


export default App
