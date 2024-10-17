import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { GameContext } from '../contexts/GameContext.jsx';

export default function PlayerBox({ boxNumber }) {
    const { idPlayer, players, playersNames, turnPlayer } = useContext(GameContext);
    let firstPlayer = '';

    if (players.length > boxNumber) {
        const otherPlayers = players.filter(player => player !== idPlayer);
        firstPlayer = otherPlayers[boxNumber - 1]; // Get the player in the list
    }

    return (
        <Card 
            className="player-box" 
            style={{ 
                width: '100px', 
                height: '100px', 
            }}
        >
            <Card.Body>
                <Card.Title style={{ fontSize: '12px' }}>
                    {firstPlayer ? playersNames[players.indexOf(firstPlayer)] : 'Disconnected'}
                </Card.Title>
                {/* Otra info aca */}
            </Card.Body>
        </Card>
    );
}