import { useEffect, useContext } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import '../styles/Board.css';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import ButtonSet from './ButtonSet.jsx'
import CardSet from './CardSet.jsx'


export default function Game({ onPassTurn }) {
    const { setBoard } = useContext(GameContext);


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
            </Row>
            <Row>
                <ButtonSet onPassTurn={onPassTurn} />
            </Row>
        </>

    );
}
