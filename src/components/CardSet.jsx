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
    const [currentPlayers, setCurrentPlayers] = useState(players);
    let firstPlayer = '';

    useEffect(() => {
        setCurrentPlayers(players);
    }, [players]);

    if (currentPlayers.length > position && position != 0) {
        const otherPlayers = currentPlayers.filter(player => player != idPlayer);
        firstPlayer = otherPlayers[position-1]; // Get the player in the list
    }

    return (
        <Row>
            <Col className="cardset-horizontal">
                <Row className="justify-content-md-center">
                    <h4>{position != 0 ? (firstPlayer ? playersNames[currentPlayers.indexOf(firstPlayer)] : 'Disconnected') : ''} </h4>
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
            </Col>
        </Row>
    );
}

export function CardSetVertical({ position }) {
    const { idPlayer, players, playersTurns, turnPlayer, playersNames } = useContext(GameContext);
    const [currentPlayers, setCurrentPlayers] = useState(players);
    let firstPlayer = '';

    useEffect(() => {
        setCurrentPlayers(players);
    }, [players]);
 
    if (currentPlayers.length > position && position != 0) {
        const otherPlayers = currentPlayers.filter(player => player != idPlayer);
        firstPlayer = otherPlayers[position-1]; // Get the player in the list
    }

    return (
        <Col>
            <Row xs="auto">
            <h4>{firstPlayer ? playersNames[currentPlayers.indexOf(firstPlayer)] : 'Disconnected'} </h4>
            </Row>
            <Row>
                <Col className="cardset-vertical align-items-center bg-cardset">
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                    </Row>
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                    </Row>
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest} />
                    </Row>
                </Col>
            </Row>
        </Col>
    );
}