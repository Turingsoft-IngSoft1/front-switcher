import { useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import '../styles/Lobby.css';
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';
import ButtonSet from  './ButtonSet.jsx'


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
                    {players.length > 1 && (() => {
                        const otherPlayers = players.filter(player => player !== idPlayer);
                        const firstPlayer = otherPlayers[0]; // Get the second player in the list
                        console.log(firstPlayer)
                        return firstPlayer ? (
                            <h1>{playersNames[players.indexOf(firstPlayer)]}</h1>
                        ) : null;
                    })()}
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto" className="justify-content-md-left">
                        {players.length > 2 && (() => {
                            const otherPlayers = players.filter(player => player !== idPlayer);
                            const secondPlayer = otherPlayers[1]; // Get the second player in the list
                            console.log(secondPlayer);
                            return secondPlayer ? (
                                <h1>{playersNames[players.indexOf(secondPlayer)]}</h1>
                            ) : null;
                        })()}
                    </Col>
                    <Col xs="auto">
                    <Row>
                        <Board />
                        <ButtonSet onPassTurn={onPassTurn} />
                    </Row>
                    </Col>
                    <Col xs="auto" className="justify-content-md-right">
                        {players.length > 3 && (() => {
                            const otherPlayers = players.filter(player => player !== idPlayer);
                            const thirdPlayer = otherPlayers[2]; // Get the second player in the list
                            console.log(thirdPlayer);
                            return thirdPlayer ? (
                                <h1>{playersNames[players.indexOf(thirdPlayer)]}</h1>
                            ) : null;
                        })()}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
