import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import CardSetFig from './CardSet.jsx';
import PlayerBox from "./PlayerBox.jsx";
import ExitButton from "./ExitButton.jsx";
import ButtonSet from "./ButtonSet.jsx";
import CardSetMov from "./CardSetMov.jsx";
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";
import CardMovContainer from "../containers/CardMovContainer.jsx";
import CardFigContainer from "../containers/CardSetContainer.jsx";



function NotifyWinner ({winner, handleHide}) {
    return (
        <Modal show={winner} onHide={handleHide}>
        <Modal.Header>
                <h4> GANASTE!!! </h4>
        </Modal.Header>
        <Modal.Footer>
            <ExitButton intext='Cerrar' variant="success" />
        </Modal.Footer>
        </Modal>
    );
}

export default function Game({onPassTurn, onUpdateBoard, onConfirmMovement}) {
    const { players, idGame, setInfoPlayers, idPlayer, turnPlayer, winner, namePlayer,playerTurns, setBoard, setPlayers, setPlayersTurns, setPlayersNames, setWinner} = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (turnPlayer == idPlayer) {
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
    }, [turnPlayer]);
    
    const numberOfPlayers = players.length;

    const handleHide = () => {
        setFase('crear');
        setShouldConnect(false);
        setIsOwner(false);
        setIdPlayer(null);
        setIdGame(null);
        setPlayers([]);
        setCurrentTurn(null);
        setBoard(Array(36).fill("dark"));
        setFigureCards([]);
        setMovCards([]);
        setPlayersNames([]);
        setInfoPlayers([]);
        setPlayersTurns([]);
        setWinner(false);
    }

    useEffect(() => {        
        onUpdateBoard()
    }, [turnPlayer]);

    const otherPlayers = players.filter(player => player != idPlayer);

    return (
        <>
            <Row className="justify-content-center" >
                <Col xs="auto" className="d-flex align-items-center justify-content-center">
                    {numberOfPlayers > 1 ? <CardFigContainer idOwnsSet={otherPlayers[0]} position={1} isHorizontal={true}/> : <div className="empty-player"></div>}
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    {numberOfPlayers > 2 ? <CardFigContainer idOwnsSet={otherPlayers[1]} position={2} isHorizontal={false}/> : <div className="empty-player"></div>}
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    {numberOfPlayers > 3 ? <CardFigContainer idOwnsSet={otherPlayers[2]} position={3} isHorizontal={false} /> : <div className="empty-player"></div>}
                    
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4 style={style}>
                        {namePlayer}
                    </h4>
                </Col>

            </Row>
            <Row className="justify-content-between">

                <Col xs={6} md={3} className="d-flex justify-items-center" >
                    <CardSetMov />
                </Col>
                <Col xs={4}>
                    <CardFigContainer idOwnsSet={idPlayer} position={0} isHorizontal={true}/>
                </Col>
                
                <Col xs={2} md={2} className="d-flex align-items-center" ></Col>
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} onConfirmMovement={onConfirmMovement}/>
            </Row>
            <style>
                {vibrationAnimation}
            </style>
            <NotifyWinner winner = {winner} handleHide={handleHide}/>
        </>
    );
}