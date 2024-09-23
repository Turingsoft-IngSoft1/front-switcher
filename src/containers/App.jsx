import { useState, useEffect } from 'react'
import '../styles/App.css'
import JoinButton from './components/JoinButton'
function App() {
  const [Match, setMatch] = useState(null)
  useEffect(() => {
    setMatch({id:12});
  }, []);
  return (
    <>
      <h1>Join Button test</h1>
      <div>
        <p>
          <JoinButton selectedMatch={Match} />
        </p>
      </div>
    </>
  )
}


export default App
