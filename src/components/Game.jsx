import { useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import '../styles/Lobby.css';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import ExitButton from './ExitButton.jsx';

function ButtonSet(){
    return (
    <Row className="justify-content-md-around p-3">
        <Col xs="auto"><Button className="cards-button">Pedir cartas</Button></Col>
        <Col xs="auto"><Button className="confirm-button">Confirmar movimiento</Button></Col>
        <Col xs="auto"><Button className="next-turn-button">Siguiente turno</Button></Col>
        <Col xs="auto"><ExitButton intext='Abandonar partida'/></Col>
    </Row>     
    );
}

export default function Game() {
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
        <Row>
                <Board />
                <ButtonSet />
        </Row>
    );
}
