import '../styles/cards.css';
import { Image, Container, Col, Row } from 'react-bootstrap';
import imgtest from '../styles/cards/fig01.svg';
import { useContext, useEffect, useState } from "react";
import { GameContext } from '../contexts/GameContext.jsx';

function CardSwitcher({ imgsource }) {
    return (
        <Container className="card-switcher">
            <Row>
                <Image src={imgsource} className="img-content" />
            </Row>
        </Container>
    );
}

export function CardSetHorizontal({ position }) {
    const { idPlayer, players, playersTurns, turnPlayer, playersNames } = useContext(GameContext);
    const [style, setStyle] = useState({});
    const [currentPlayers, setCurrentPlayers] = useState(players);
    let firstPlayer = '';

    useEffect(() => {
        setCurrentPlayers(players);
    }, [players]);

    if (currentPlayers.length > position && position != 0) {
        const otherPlayers = currentPlayers.filter(player => player != idPlayer);
        firstPlayer = otherPlayers[position-1]; // Get the player in the list
    }

    useEffect(() => {
        if (turnPlayer == firstPlayer) {
            setStyle({
                color: '#000000', // Color Negro
                animation: 'vibrate 0.5s 1',
                textShadow: '0 0 2px #000000', // Efecto de glow
                fontWeight: 'bold' // Bold
            });
        } else {
            setStyle({
                color: 'inherit',
                animation: 'none',
                textShadow: 'none',
                fontWeight: 'normal'
            });
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
        <Row>
            <Col className="cardset-horizontal">
                <Row className="justify-content-md-center">
                    <h4 style={style}>{position != 0 ? (firstPlayer ? playersNames[currentPlayers.indexOf(firstPlayer)] : 'Disconnected') : ''} </h4>
                </Row>
                <Row className="justify-content-md-center bg-cardset">
                    <Col xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                    </Col>
                    <Col xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                    </Col>
                    <Col xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                    </Col>
                </Row>
                <style>
                    {vibrationAnimation}
                </style>
            </Col>
        </Row>
    );
}

export function CardSetVertical({ position }) {
    const { idPlayer, players, playersTurns, turnPlayer, playersNames } = useContext(GameContext);
    const [style, setStyle] = useState({});
    const [currentPlayers, setCurrentPlayers] = useState(players);
    let firstPlayer = '';

    useEffect(() => {
        setCurrentPlayers(players);
    }, [players]);
 
    if (currentPlayers.length > position && position != 0) {
        const otherPlayers = currentPlayers.filter(player => player != idPlayer);
        firstPlayer = otherPlayers[position-1]; // Get the player in the list
    }

    useEffect(() => {
        if (turnPlayer == firstPlayer) {
            setStyle({
                color: '#000000', // Color Negro
                animation: 'vibrate 0.5s 1',
                textShadow: '0 0 2px #000000', // Efecto de glow
                fontWeight: 'bold' // Bold
            });
        } else {
            setStyle({
                color: 'inherit',
                animation: 'none',
                textShadow: 'none',
                fontWeight: 'normal'
            });
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
        <Col>
            <Row xs="auto">
            <h4 style={style}>{firstPlayer ? playersNames[players.indexOf(firstPlayer)] : 'Disconnected'} </h4>
            </Row>
            <Row>
                <Col className="cardset-vertical align-items-center bg-cardset">
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                        <CardSwitcher imgsource={imgtest} />
                    </Row>
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                        <CardSwitcher imgsource={imgtest} />
                    </Row>
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                        <CardSwitcher imgsource={imgtest} />
                    </Row>
                </Col>
            </Row>
            <style>
                {vibrationAnimation}
            </style>
        </Col>
    );
}