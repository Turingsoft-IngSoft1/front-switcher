import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { GameContext } from '../contexts/GameContext.jsx';

export default function PlayerBox({ boxNumber }) {
    const { idPlayer, players, playersNames, turnPlayer } = useContext(GameContext);
    const [style, setStyle] = useState({});
    let firstPlayer = '';

    if (players.length > boxNumber) {
        const otherPlayers = players.filter(player => player !== idPlayer);
        firstPlayer = otherPlayers[boxNumber - 1]; // Get the player in the list
    }

    useEffect(() => {
        if (turnPlayer == firstPlayer) {
            setStyle({
                border: '2px solid #800080', // Purple border
                animation: 'vibrate 0.2s 1',
                boxShadow: '0 0 10px #800080, 0 0 20px #800080, 0 0 30px #800080' // Purple glow effect
            });
        } else {
            setStyle({});
        }
    }, [turnPlayer, firstPlayer]);

    const vibrationAnimation = `
        @keyframes vibrate {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;

    return (
        <Card 
            className="player-box" 
            style={{ 
                width: '100px', 
                height: '100px', 
                ...style
            }}
        >
            <style>
                {vibrationAnimation}
            </style>
            <Card.Body>
                <Card.Title style={{ fontSize: '12px' }}>
                    {firstPlayer ? playersNames[players.indexOf(firstPlayer)] : 'Disconnected'}
                </Card.Title>
                {/* Otra info aca */}
            </Card.Body>
        </Card>
    );
}