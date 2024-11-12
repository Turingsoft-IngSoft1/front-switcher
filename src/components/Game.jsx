import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Modal, Container } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext.jsx";
import Board from "./Board.jsx";
import ExitButton from "./ExitButton.jsx";
import ButtonSet from "./ButtonSet.jsx";
import Timer from "./Timer.jsx";
import { WebSocketContext, ChatWebSocketContext} from "../contexts/WebSocketContext.jsx";
import CardMovContainer from "../containers/CardMovContainer.jsx";
import CardFigContainer from "../containers/CardSetContainer.jsx";
import "../styles/cards.css";
import Chat from "./Chat.jsx";

function NotifyWinner({ winner, handleHide }) {
    const { idPlayer } = useContext(GameContext);
    return (
        <Modal show={winner != "false"} onHide={handleHide}>
            <Modal.Header>
                {winner == idPlayer ? <h4>GANASTE!!!!</h4> : <h4>PERDISTE</h4>}
            </Modal.Header>
            <Modal.Footer>
                <ExitButton intext="Cerrar" variant="success" />
            </Modal.Footer>
        </Modal>
    );
}

export default function Game({ onPassTurn, onUpdateBoard, onConfirmMovement }) {
    const {
        players,
        idGame,
        setInfoPlayers,
        idPlayer,
        turnPlayer,
        winner,
        namePlayer,
        playerTurns,
        setBoard,
        setPlayers,
        setPlayersTurns,
        setPlayersNames,
        setWinner,
    } = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);
    const { setShouldConnectChat } = useContext(ChatWebSocketContext);

    const numberOfPlayers = players.length;

    const handleHide = () => {
        setFase("crear");
        setShouldConnect(false);
        setFiguresOnBoard(null);
        setShouldConnectChat(false);
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
        setWinner("false");
    };

    useEffect(() => {
        onUpdateBoard();
    }, [turnPlayer]);

    const otherPlayers = players.filter((player) => player != idPlayer);

    return (
        <>
                <Row> 
                <Col xs={10}>
                    <Row className="justify-content-center">
                        <Col
                            xs="auto"
                            className="d-flex align-items-center justify-content-center"
                        >
                            {numberOfPlayers > 1 ? (
                                <CardFigContainer
                                    idOwnsSet={otherPlayers[0]}
                                    position={1}
                                    isHorizontal={true}
                                />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={3} className="d-flex align-items-center">
                            {numberOfPlayers > 2 ? (
                                <CardFigContainer
                                    idOwnsSet={otherPlayers[1]}
                                    position={2}
                                    isHorizontal={false}
                                />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                        <Col
                            xs={4}
                            md={6}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <Board />
                        </Col>
                        <Col xs={4} md={2} className="d-flex align-items-center">
                            {numberOfPlayers > 3 ? (
                                <CardFigContainer
                                    idOwnsSet={otherPlayers[2]}
                                    position={3}
                                    isHorizontal={false}
                                />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs={4}
                            md={6}
                            className="d-flex justify-content-end"
                        >
                            <h4
                                className={
                                    turnPlayer == idPlayer
                                        ? "has-turn"
                                        : "not-turn"
                                }
                            >
                                {namePlayer}
                            </h4>
                        </Col>
                    </Row>
                    <Row className="justify-content-start">
                        <Col
                            xs={6}
                            md={4}
                            className="d-flex"
                        >
                            <CardMovContainer />
                        </Col>
                        <Col xs={5}>
                            <CardFigContainer
                                idOwnsSet={idPlayer}
                                position={0}
                                isHorizontal={true}
                            />
                        </Col>

                        <Col
                            xs={0}
                            md={2}
                            className="d-flex align-items-center"
                        >
                        <Timer/>
                        </Col>
                    </Row>
                    <Row>
                        <ButtonSet
                            onPassTurn={onPassTurn}
                            onConfirmMovement={onConfirmMovement}
                        />
                    </Row>
                </Col>
                <Col xs={2} className="px-0">
                    <Chat />
                </Col>
            </Row>
            <NotifyWinner winner={winner} handleHide={handleHide} />
        </>
    );
}
