import React, { useContext, useEffect } from 'react';
import CardSetMov from '../components/CardSetMov.jsx';
import getMovementCards from '../services/cardServices.js';
import { GameContext } from '../contexts/GameContext.jsx';

export default function CardMovContainer () {
    const { idGame, idPlayer, turnPlayer, setMovCards, fase} = useContext(GameContext);
    useEffect(() => {
        if(turnPlayer == idPlayer){
            const newCards = getMovementCards(idGame, idPlayer);
            setMovCards(newCards);
        }
    }, [turnPlayer]);
    

    return <CardSetMov getMovementCards={getMovementCards} />;

}

