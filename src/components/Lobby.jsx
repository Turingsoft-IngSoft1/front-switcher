import {useState} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";

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
    switch(stage){
        case "in-game":
            return (
                <Row xs={4} className='my-5'>
                <Col><Button className="cards-button">Pedir cartas</Button></Col>
                <Col><Button className="confirm-button">Confirmar movimiento</Button></Col>
                <Col><Button className="next-turn-button">Siguiente turno</Button></Col>
                <Col><Button className="exit-button" variant="danger">Abandonar partida</Button></Col>
                </Row>
            );
        case "pre-game":
            return (
                <Row xs={2} className='my-5'>
                <Col><Button className="start-button" onClick = {onStartClick} >Iniciar Partida</Button></Col>
                <Col><Button className="exit-button" variant="danger">Abandonar partida</Button></Col>
                </Row>
            );
        default:
            return null;
    }

}

function Chat () {

    return (
        <Container>
            <h1>El chat va a estar aca</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Container>
    );
}

function Ficha({variant, onFichaClick}){
    return(
        <Button className = "ficha" onClick={onFichaClick} variant = {variant}></Button>
    );
}

function Tablero(){
    const [fichas, setFichas] = useState(Array(36).fill("dark"));


    return(
        <div className="tablero">
        <Container>
            <Row className="justify-content-md-center">
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
                <Col xs="auto"><Ficha variant="dark" /></Col>
            </Row>
        </Container>
        </div>
    );
}


//CARTAS HARDCODEADAS, IMPLEMENTAR LUEGO
/* Nota: por defecto, la interfaz se setea en pre-game, se deberia realizar un chequeo por si el jugador ya esta en una partida
         para pasar directamente a in-game sin tener que apretar el boton de comenzar juego*/
export default function Lobby (){
    const [gameStage, setGameStage] = useState("pre-game");

    function handleStart(){
        setGameStage("in-game");
        console.log("hola");
    }

    return (
        <>
        <Container>
        <Row>
            <Col xs="11">
                {/* Cartas del jugador 1, tablero jugador 3 */}
                <Row>          
                        <Tablero />
                </Row >

                {/* Cartas del jugador usuario (0) */}
                <Row className="justify-content-md-center">
                    <CardSet className="card-set"/>
                </Row>
                {/* acciones del jugador */}
                <ButtonSet stage = {gameStage} onStartClick= {handleStart}/>
            </Col>
            <Col xs ="1"><Chat /></Col>
        </Row>
        </Container>
        </>
    );
}