import React, { useContext, useEffect } from 'react';
import CardSetMov from '../components/CardSetMov.jsx';
import {getMovementCards, useMovementCard} from '../services/cardServices.js';
import { GameContext } from '../contexts/GameContext.jsx';

export default function CardMovContainer () {
    const { idGame, idPlayer, turnPlayer, setMovCards, movCards, fase, board} = useContext(GameContext);
    useEffect(() => {
        const fetchMovementCards = async () => {
                const result = await getMovementCards(idGame, idPlayer);
                if (result && result.moves) {
                    setMovCards(movCards => [...movCards, ...result.moves]);
                    
                }
            // }
        };
     fetchMovementCards();
     console.log("movCards " + movCards);
     }, [fase, turnPlayer, board]);
    

    return <CardSetMov />;

}

