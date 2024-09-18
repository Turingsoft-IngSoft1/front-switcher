import {useState} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";

function CardSet (){
    return (
        <>
        <Col xs lg="2"><Card style={{ width: '60px', height: '90px' }}></Card></Col>
        <Col xs lg = "2"><Card style={{ width: '60px', height: '90px' }}></Card></Col>
        <Col xs lg = "2"><Card style={{ width: '60px', height: '90px' }}></Card></Col>
        </>
    );
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
        <Container xs="8">
            <Row>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
            </Row>
            <Row>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
            </Row>
            <Row>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
            </Row>
            <Row>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
            </Row>
            <Row>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
            </Row>
            <Row>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
                <Col><Ficha variant="dark" /></Col>
            </Row>
        </Container>
    );
}


//CARTAS HARDCODEADAS, IMPLEMENTAR LUEGO
export default function Lobby (){

    return (
        <>
        <Container>
        <Row>
            <Col xs="11">
                {/*Cartas del jugador 2 */}
                <Row className="justify-content-md-center">
                    <CardSet/>
                </Row>

                {/* Cartas del jugador 1, tablero jugador 3 */}
                <Row className="justify-content-md-center">
                    <Col sm="2">
                        <CardSet/>
                    </Col>               
                    <Col sm = "8">
                        <Tablero />
                    </Col>
                    <Col sm = "2">
                        <CardSet/>
                    </Col>
                </Row >

                {/* Cartas del jugador usuario (0) */}
                <Row className="justify-content-md-center">
                    <CardSet/>
                </Row>
                {/* acciones del jugador */}
                <Row>
                    <Col><Button classnName="cards-button">Pedir cartas</Button></Col>
                    <Col><Button className="confirm-button">Confirmar movimiento</Button></Col>
                    <Col><Button className="next-turn-button">Siguiente turno</Button></Col>
                    <Col><Button className="exit-button" variant="danger">Abandonar partida</Button></Col>
                </Row>
            </Col>
            <Col xs ="1"><Chat /></Col>
        </Row>
        </Container>
        </>
    );
}