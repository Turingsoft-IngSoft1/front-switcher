import React, { useContext, useEffect } from 'react';
import CardSetMov from '../components/CardSetMov.jsx';
import getMovementCards from '../services/cardServices.js';
import { GameContext } from '../contexts/GameContext.jsx';

export default function CardMovContainer () {
    const { idGame, idPlayer, turnPlayer, setMovCards, fase} = useContext(GameContext);
    // useEffect(() => {
    //     const fetchMovementCards = async () => {
    //         console.log('fetcheo');
    //         console.log(turnPlayer);
    //         console.log(idPlayer);
    //         if (turnPlayer == idPlayer) {
    //             const result = await getMovementCards(idGame, idPlayer);
    //             console.log(result);
    //             if (result && result.moves) {
    //                 console.log('RESSS');
    //                 console.log(result.moves);
    //                 setMovCards(result.moves);
    //             }
    //         }
    //     };
        
    //     fetchMovementCards();
    // }, [turnPlayer]);
    

    return <CardSetMov getMovementCards={getMovementCards} />;

}

