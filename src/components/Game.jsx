import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import {CardSetHorizontal, CardSetVertical} from './CardSet.jsx';
import PlayerBox from "./PlayerBox.jsx";
import ExitButton from "./ExitButton.jsx";
import ButtonSet from "./ButtonSet.jsx";
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";
import CardMovContainer from "../containers/CardMovContainer.jsx";


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

export default function Game({onPassTurn, onUpdateBoard}) {
    const { players, idGame, setInfoPlayers, turnPlayer, winner, namePlayer,playerTurns, setBoard, setPlayers, setPlayersTurns, setPlayersNames, setWinner} = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);
    
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
        console.log(playerTurns)     
    }, [setBoard, turnPlayer]);

    return (
        <>
            <Row className="justify-content-center" >
                <Col xs="auto" className="d-flex align-items-center justify-content-center">
                    {numberOfPlayers > 1 ? <CardSetHorizontal position={1}/> : <div className="empty-player"></div>}
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    {numberOfPlayers > 2 ? <CardSetHorizontal position={2}/> : <div className="empty-player"></div>}
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    {numberOfPlayers > 3 ? <CardSetHorizontal position={3}/> : <div className="empty-player"></div>}
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4>
                        {namePlayer}
                    </h4>
                </Col>

            </Row>
            <Row className="justify-content-between">
                <Col xs={6} md={3} className="d-flex justify-items-center" >
                    <CardMovContainer />
                </Col>
                <Col xs={4}>
                    <CardSetHorizontal position={0} />
                </Col>
                
                <Col xs={2} md={2} className="d-flex align-items-center" ></Col>
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} />
            </Row>
            <NotifyWinner winner = {winner} handleHide={handleHide}/>
        </>
    );
}