import { useEffect, useContext } from "react";
import '../styles/Board.css';
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import {CardSetHorizontal, CardSetVertical} from './CardSet.jsx';
import PlayerBox from "./PlayerBox.jsx";
import ExitButton from "./ExitButton.jsx";
import ButtonSet from "./ButtonSet.jsx";
import CardSetMov from "./CardSetMov.jsx";

export default function Game({onPassTurn}) {
    const { winner, namePlayer, setBoard, setPlayers, setPlayersTurns, setPlayersNames, setWinner} = useContext(GameContext);
    
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
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <CardSetHorizontal />
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <CardSetVertical turn={3}/>
                </Col>
                <Col xs={4} md={6}>
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    <CardSetVertical turn={1} />
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4>{namePlayer}</h4>
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
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

                <Col xs={6} md={3} className="d-flex align-items-center" >
                    <CardSetMov />
                </Col>
                <Col xs={4}>
                    <CardSetHorizontal turn={0} />
                </Col>
                
                <Col xs={2} md={2} className="d-flex align-items-center" ></Col>
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} />
            </Row>
        </>

    );
}
