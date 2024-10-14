import {useState, useContext, useEffect} from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Board.css'
import Board from './Board.jsx'
import { GameContext } from '../contexts/GameContext.jsx';
import ExitButton from './ExitButton.jsx';
import PlayerBox from "./PlayerBox.jsx";
import CardSetFig from './CardSet.jsx';

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
    const { winner, setWinner, fase, idPlayer, namePlayer, players, idGame, setBoard} = useContext(GameContext);
    
    const handleStart = (e) =>{
        e.preventDefault();
        const gameData = {
            "id_game" : idGame
        };
        onStartGame(gameData);
    }

    const numberOfPlayers = players.length;

    return (
        <>
            <Row className="justify-content-center">
                <Col xs="auto" className="d-flex align-items-center justify-content-center">
                    {numberOfPlayers > 1 ? <PlayerBox boxNumber={1}/>: <div className="empty-player"></div>}
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    {numberOfPlayers > 2 ? <PlayerBox boxNumber={2}/> : <div className="empty-player"></div>}
                </Col>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <Board />
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center">
                    {numberOfPlayers > 3 ? <PlayerBox boxNumber={3}/> : <div className="empty-player"></div>}
                </Col>
            </Row>
            <Row>
                <Col xs={4} md={6} className="d-flex align-items-center justify-content-center">
                    <h4>{namePlayer}</h4>
                </Col>
            </Row>

            {/* Cartas del jugador 0*/} 
            <Row className="justify-content-md-center">
            </Row>
            {/* acciones del jugador 0*/}
            <Row className="justify-content-md-around p-3">
                <ButtonSet onStartClick= {handleStart}/>
            </Row>
        </>
    );
}
