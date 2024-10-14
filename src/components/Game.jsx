import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import {CardSetFig} from './CardSet.jsx';
import PlayerBox from "./PlayerBox.jsx";
import ExitButton from "./ExitButton.jsx";
import ButtonSet from "./ButtonSet.jsx";
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";
import CardMovContainer from "../containers/CardMovContainer.jsx";
import CardFigContainer from "../containers/CardSetContainer.jsx";


export default function Game({onPassTurn, onUpdateBoard}) {
    const { idPlayer, idGame, turnPlayer, winner, namePlayer, setBoard, setPlayers, setPlayersTurns, setPlayersNames, setWinner} = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);


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
        setPlayersTurns([]);
        setWinner(false);
    }

    useEffect(() => {        
        onUpdateBoard()     
    }, [setBoard, turnPlayer]);

    return (
        <>
            <Row className="justify-content-center">
                <Col xs="auto" className="d-flex align-items-center justify-content-center">
                    <CardFigContainer position={1} isHorizontal={true}/>
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <CardFigContainer position={2} isHorizontal={false}/>
                </Col>
                <Col xs={4} md={6}>
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    <CardFigContainer position={3} isHorizontal={false} />
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4>
                        {namePlayer}
                    </h4>
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
            </Row>
            <Row className="justify-content-between">

                <Col xs={6} md={3} className="d-flex justify-items-center" >
                    <CardMovContainer />
                </Col>
                <Col xs={4}>
                    <CardFigContainer position={0} isHorizontal={true}/>
                </Col>
                
                <Col xs={2} md={2} className="d-flex align-items-center" ></Col>
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} />
            </Row>
            <Modal show={winner} onHide={handleHide}>
                <Modal.Header>
                    <h4> GANASTE!!! </h4>
                </Modal.Header>
                <Modal.Footer>
                    <ExitButton intext='Cerrar' variant="success" />
                </Modal.Footer>
            </Modal>
        </>
    );
}