import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { GameContext } from '../contexts/GameContext.jsx';
import PlayerBox from './PlayerBox';
import Board from './Board';
import CardSet from './CardSet';
import ButtonSet from './ButtonSet';
import ExitButton from './ExitButton';

export default function Game({ onPassTurn }) {
    const { idPlayer, players, turnPlayer, winner, namePlayer, setBoard, setPlayers, setPlayersTurns, setPlayersNames, setWinner } = useContext(GameContext);
    const [style, setStyle] = useState({});
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    useEffect(() => {
        if (turnPlayer == idPlayer) {
            setIsPlayerTurn(true);
            setStyle({
                color: '#000000', // Black color
                animation: 'vibrate 0.5s 1',
                textShadow: '0 0 2px #000000', // Add glow effect
                fontWeight: 'bold' // Make the text bold
            });
        } else {
            setIsPlayerTurn(false);
            setStyle({
                color: 'inherit',
                animation: 'none',
                textShadow: 'none',
                fontWeight: 'normal'
            });
        }
    }, [turnPlayer]);

    const handleHide = () => {
        setFase('crear');
        setIsOwner(false);
        setIdPlayer(null);
        setIdGame(null);
        setPlayers([]);
        setCurrentTurn(null);
        setBoard(Array(36).fill("dark"));
        setFigureCards([]);
        setMovCards([]);
        setPlayersNames([]);
        setPlayersTurns([]);
        setWinner(false);
    }
    
    useEffect(() => {
        const initialBoard = Array(36).fill("dark");

        // alternacion entre "danger" y "success" en el tablero
        for (let i = 0; i < 36; i++) {
            initialBoard[i] = (i % 2 === 0) ? "danger" : "success";
        }

        setBoard(initialBoard);
    }, [setBoard]);

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
        <>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <PlayerBox boxNumber={1} />
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <PlayerBox boxNumber={2} />
                </Col>
                <Col xs={4} md={6}>
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <PlayerBox boxNumber={3} />
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
            <h4 style={style}>
                {namePlayer}
            </h4>
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Modal show={winner} onHide={handleHide}>
                    <Modal.Header>
                        <h4> GANASTE!!! </h4>
                    </Modal.Header>
                    <Modal.Footer>
                        <ExitButton intext='Cerrar' variant="success" />
                    </Modal.Footer>
                </Modal>
                <CardSet />
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} />
            </Row>
            <style>
                {vibrationAnimation}
            </style>
        </>
    );
}