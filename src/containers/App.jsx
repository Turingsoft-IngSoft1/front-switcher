import { useState, useEffect } from 'react'
import '../styles/App.css'
import JoinButton from './components/JoinButton'
function App() {
  const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const fetchData = () => {
        fetch('http://localhost:8000/list_games')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
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
      <h1>Join Button test</h1>
      <div>
        <p>
          {data ? (
            data.map((match, index) => (
              <div key={index}>
                <span>{match}</span>
                <JoinButton selectedMatch={match} />
              </div>
            ))
          ) : (
            <span>Loading...</span>
          )}
        </p>
      </div>
    </>
  )
}


export default App
