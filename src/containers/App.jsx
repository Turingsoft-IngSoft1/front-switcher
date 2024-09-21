import { useState } from 'react'
import '../styles/App.css'
import Match from './listMatches/containers/list.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <div>
      <h1>List Dev</h1>
      <Match />
      </div>
    </>
  )
}

export default App
