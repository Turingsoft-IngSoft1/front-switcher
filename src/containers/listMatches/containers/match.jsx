import { useState } from 'react'
import '../styles/App.css'

function getName({name}) {
    return (
        <h1>{name}</h1>
    );
}
function getName({quantPlayers}) {
    return (
        <h2>{quantPlayers}</h2>
    );
}
function getName({minmaxPlayers}) {
    return (
        <h2>{minmaxPlayers}</h2>
    );
}

function match({name, quantPlayers, minmaxPlayers}) {

  return (
    <>
      <getName />
      <div>
        <p>
          {getName}
          {minmaxPlayers}
        </p>
      </div>
    </>
  )
}

export default match
