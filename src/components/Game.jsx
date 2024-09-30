import { useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import '../styles/Lobby.css';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import ButtonSet from  './ButtonSet.jsx'


export default function Game({onPassTurn}) {
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
                <Board />
                <ButtonSet onPassTurn={onPassTurn} />
        </Row>
        </>
    );
}
