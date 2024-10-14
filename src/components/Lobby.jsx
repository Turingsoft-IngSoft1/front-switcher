import {useState, useContext, useEffect} from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Board.css'
import Board from './Board.jsx'
import { GameContext } from '../contexts/GameContext.jsx';
import ExitButton from './ExitButton.jsx';
import PlayerBox from "./PlayerBox.jsx";
import {CardSetFig} from './CardSet.jsx';

function ButtonSet ({onStartClick}){
    
    const {isOwner} = useContext(GameContext);
            return (
                <>
                {isOwner && 
                    <>
                        <Col xs="auto"><Button className="start-button" onClick = {onStartClick} >Iniciar Partida</Button></Col>
                        <Col xs="auto" ><ExitButton intext="Abandonar Sala"/></Col>
                    </>
                }
            </>
            );

}


function Chat () {

    return (
        <Container>
        </Container>
    );
}




//CARTAS HARDCODEADAS, IMPLEMENTAR LUEGO
/* Nota: por defecto, la interfaz se setea en pre-game, se deberia realizar un chequeo por si el jugador ya esta en una partida
         para pasar directamente a in-game sin tener que apretar el boton de comenzar juego*/
export default function Lobby ({onStartGame}){
    const { winner, setWinner, fase, idPlayer, namePlayer, players, playersTurns, playersNames, idGame, setBoard, setPlayers, setPlayersTurns, setPlayersNames} = useContext(GameContext);
    
    const handleStart = (e) =>{
        e.preventDefault();
        const gameData = {
            "id_game" : idGame
        };
        onStartGame(gameData);
    }
    return (
        <>
             {/* Cartas del jugador 1, tablero jugador 3 */}
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <PlayerBox boxNumber={1}/>
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <PlayerBox boxNumber={2}/>
                </Col>
                <Col xs={4} md={6}>
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    <PlayerBox boxNumber={3}/>
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    {namePlayer}
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    
                </Col>
            </Row>
                            {/* Cartas del jugador usuario (0) */}
            
            <Row className="justify-content-md-center">
            </Row>
            {/* acciones del jugador */}
            <Row className="justify-content-md-around p-3">
                <ButtonSet onStartClick= {handleStart}/>
            </Row>
        </>
    );
}
