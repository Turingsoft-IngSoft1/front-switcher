import {useState, useContext, useEffect} from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Board.css'
import Board from './Board.jsx'
import { GameContext } from '../contexts/GameContext.jsx';
import ExitButton from './ExitButton.jsx';
import PlayerBox from "./PlayerBox.jsx";
import CardSet from './CardSet.jsx';

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
    const { fase, idPlayer, players, playersTurns, playersNames, idGame, setPlayers, setPlayersTurns, setPlayersNames} = useContext(GameContext);
    const [gameStage, setGameStage] = useState("pre-game");
    const {setFase} = useContext(GameContext);

    const handleStart = (e) =>{
        setFase("in-game");
        setGameStage("in-game");
        onStartGame(idGame);
    }
    const getPlayersInfo = () => {
        fetch('http://127.0.0.1:8000/active_players/' + idGame, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const usersList = data.users_list.map(user => user.id);
            const playersTurns = data.users_list.map(user => user.turn);
            const playersNames = data.users_list.map(user => user.name);
            setPlayers(usersList);
            setPlayersTurns(playersTurns);
            setPlayersNames(playersNames);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    };
    
    useEffect(() => {
        getPlayersInfo();
    
        const interval = setInterval(() => {
            getPlayersInfo(); 
            console.log("test");
        }, 5000);
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        if (gameStage === "in-game") {
            clearInterval(interval);
        }
        else if (fase === 'crear') {
            clearInterval(interval);
        }
    }, [gameStage, fase]);

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
                    PLAYER_BOX_JUGADOR
                </Col>
                <Col xs={4} md={3} className="d-flex align-items-center" >
                    
                </Col>
            </Row>
                            {/* Cartas del jugador usuario (0) */}
            
            <Row className="justify-content-md-center">
                <CardSet className="card-set"/>
            </Row>
            {/* acciones del jugador */}
            <Row className="justify-content-md-around p-3">
                <ButtonSet onStartClick= {handleStart}/>
            </Row>
        </>
    );
}
