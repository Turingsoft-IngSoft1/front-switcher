import React, { useEffect, useState } from 'react';
import Game from '../components/Game.jsx';

export default function InGameContainer (){

    const passTurn = (e) => {

    }

    const passTurnMock = () => {

    }
    return <Game  onPassTurn = {passTurnMock}/>;
}