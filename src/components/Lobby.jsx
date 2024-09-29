import {useState, useContext} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Lobby.css'
import Board from './Board.jsx'
import { GameContext } from '../contexts/GameContext.jsx';
import ExitButton from './ExitButton.jsx';


function CardSet (){
    return (
        <>
        <Col xs="auto" className="carta"><Card style={{ width: '60px', height: '90px' }}></Card></Col>
        <Col xs="auto" className="carta"><Card style={{ width: '60px', height: '90px' }}></Card></Col>
        <Col xs ="auto" className="carta"><Card style={{ width: '60px', height: '90px' }}></Card></Col>
        </>
    );
}

function ButtonSet ({stage, onStartClick}){
    
    const {isOwner} = useContext(GameContext);
    switch(stage){
        case "pre-game":
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
        default:
            return null;
    }

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
export default function Lobby (){
    const [gameStage, setGameStage] = useState("pre-game");
    const {setFase} = useContext(GameContext);
    function handleStart(){
        setFase("in-game");
        setGameStage("in-game");
    }

    return (
        <Row>
            <Col xs="11">
                {/* Cartas del jugador 1, tablero jugador 3 */}
                <Row>          
                        <Board />
                </Row >

                {/* Cartas del jugador usuario (0) */}
                <Row className="justify-content-md-center">
                    <CardSet className="card-set"/>
                </Row>
                {/* acciones del jugador */}
                <Row className="justify-content-md-around p-3">
                    <ButtonSet stage = {gameStage} onStartClick= {handleStart}/>
                </Row>
            </Col>
            <Col xs ="1"><Chat /></Col>
        </Row>
    );
}
