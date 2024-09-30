import { useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import '../styles/Lobby.css';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import ButtonSet from  './ButtonSet.jsx'
import PlayerBox from "./PlayerBox.jsx";

export default function Game({onPassTurn}) {
    const { fase, idPlayer, players, playersTurns, playersNames, idGame, setPlayers, setPlayersTurns, setPlayersNames} = useContext(GameContext);
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
            <Col xs="11">
                {/* Cartas del jugador 1, tablero jugador 3 */}
                <Row>
                    <Col xs="12" className="justify-content-md-center">
                        <PlayerBox boxNumber={1}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto" className="justify-content-md-left">
                        <PlayerBox boxNumber={2}/>
                    </Col>
                    <Col xs="auto" className="justify-content-md-right">
                        <PlayerBox boxNumber={3}/>
                    </Col>
                    <Col xs="auto">
                    <Row>
                        <Board />
                        <ButtonSet onPassTurn={onPassTurn} />
                    </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
