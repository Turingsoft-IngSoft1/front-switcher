import { useEffect, useContext } from "react";
import '../styles/Board.css';
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import '../styles/Lobby.css';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import CardSet from './CardSet.jsx'
import ButtonSet from  './ButtonSet.jsx'
import PlayerBox from "./PlayerBox.jsx";
import ExitButton from "./ExitButton.jsx";


export default function Game({onPassTurn}) {
    const { winner, fase, idPlayer, players, playersTurns, playersNames, idGame, setPlayers, setPlayersTurns, setPlayersNames, setWinner} = useContext(GameContext);
    const { setBoard } = useContext(GameContext);
    
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

    return (
        <>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <h4>Vacio</h4>
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4>Nombre Turno3</h4>
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    <h4>Vacio</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <h4>NombreTurno4</h4>
                </Col>
                <Col xs={4} md={6}>
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    <h4>NombreTurno2</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4>MiNombre</h4>
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <CardSet />
                <Modal show={winner} onHide={handleHide}>
                            <Modal.Header>
                                    <h4> GANASTE!!! </h4>
                            </Modal.Header>
                            <Modal.Footer>
                                <ExitButton intext='Aceptar' variant="success" />
                            </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} />
            </Row>
        </>

    );
}
