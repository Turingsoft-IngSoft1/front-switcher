import { GameContext } from '../contexts/GameContext.jsx';
import { Card } from "react-bootstrap";
import { useContext } from "react";

export default function PlayerBox({ boxNumber }) {
    const { idPlayer, players, playersNames } = useContext(GameContext);
    let firstPlayer = '';
    if (players.length > boxNumber) {
        const otherPlayers = players.filter(player => player !== idPlayer);
        firstPlayer = otherPlayers[boxNumber - 1]; // Get the player in the list
        console.log(firstPlayer);
    }
    return (
        <Card className="player-box" style={{ width: '100px', height: '100px' }}>
            <Card.Body>
                <Card.Title style={{ fontSize: '12px' }}>
                    {firstPlayer ? playersNames[players.indexOf(firstPlayer)] : 'Disconnected'}
                </Card.Title>
                {/* Otra info aca */}
            </Card.Body>
        </Card>
    );
}