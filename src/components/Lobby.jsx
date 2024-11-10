import { useState, useContext, useEffect } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import "../styles/Board.css";
import Board from "./Board.jsx";
import { GameContext } from "../contexts/GameContext.jsx";
import ExitButton from "./ExitButton.jsx";
import PlayerBox from "./PlayerBox.jsx";
import CardSetFig from "./CardSet.jsx";
import Chat from "./Chat.jsx";
import { WebSocketContext, ChatWebSocketContext} from "../contexts/WebSocketContext.jsx";

function NotifyCancel({ winner, handleHide }) {
    return (
        <Modal show={winner == "cancelado"} onHide={handleHide}>
            <Modal.Header>
                <h4> Se cancelo la partida </h4>
            </Modal.Header>
            <Modal.Footer>
                <ExitButton intext="Cerrar" variant="success" />
            </Modal.Footer>
        </Modal>
    );
}

function ButtonSet({ onStartClick }) {
    const { isOwner } = useContext(GameContext);
    return (
        <>
            {isOwner ? (
                <>
                    <Col xs="auto">
                        <Button className="start-button" onClick={onStartClick}>
                            Iniciar Partida
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <ExitButton intext="Cancelar Partida" />
                    </Col>
                </>
            ) : (
                <Col xs="auto">
                    <ExitButton intext="Abandonar Partida" />
                </Col>
            )}
        </>
    );
}
//CARTAS HARDCODEADAS, IMPLEMENTAR LUEGO
/* Nota: por defecto, la interfaz se setea en pre-game, se deberia realizar un chequeo por si el jugador ya esta en una partida
         para pasar directamente a in-game sin tener que apretar el boton de comenzar juego*/
export default function Lobby({ onStartGame }) {
    const {
        setIdGame,
        setIdPlayer,
        winner,
        setWinner,
        fase,
        idPlayer,
        namePlayer,
        players,
        idGame,
        setInfoPlayers,
        turnPlayer,
        playerTurns,
        setBoard,
        setPlayers,
        setPlayersTurns,
        setPlayersNames,
    } = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);
    const { setShouldConnectChat } = useContext(ChatWebSocketContext);
    
    const handleHide = () => {
        setFase("crear");
        setShouldConnect(false);
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

    const handleStart = (e) => {
        e.preventDefault();
        const gameData = {
            id_game: idGame,
        };
        onStartGame(gameData);
    };

    const numberOfPlayers = players.length;
    return (
        <>
            <Row>
                <Col xs={8}>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="d-flex align-items-center justify-content-center">
                            {numberOfPlayers > 1 ? (
                                <PlayerBox boxNumber={1} />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={3} className="d-flex align-items-center">
                            {numberOfPlayers > 2 ? (
                                <PlayerBox boxNumber={2} />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                        <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                            <Board />
                        </Col>
                        <Col xs={4} md={3} className="d-flex align-items-center">
                            {numberOfPlayers > 3 ? (
                                <PlayerBox boxNumber={3} />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={6} className="d-flex align-items-center justify-content-center"></Col>
                        <Col xs={4} md={3} className="d-flex align-items-center">
                            {numberOfPlayers > 3 ? (
                                <PlayerBox boxNumber={3} />
                            ) : (
                                <div className="empty-player"></div>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs={4}
                            md={6}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <h4>{namePlayer}</h4>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <ButtonSet onStartClick={handleStart} />
                    </Row>
                </Col>
                <Col xs={2}>
                    <Row className="justify-content-md-center"></Row>
                    <Row className="justify-content-md-around p-3">
                    </Row>
                </Col>
                <Col xs={2}>
                    <Chat />
                </Col>
            </Row>
            <NotifyCancel winner={winner} handleHide={handleHide} />
        </>
    );
}