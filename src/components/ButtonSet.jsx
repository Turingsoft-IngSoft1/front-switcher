import { Row, Col, Button } from "react-bootstrap";

function PedirCartasButton (){
    return (
        <Col>
        <Button className="pedir-cartas-button">Pedir cartas</Button>
        </Col>
    )
}

function ConfirmMovementButton (){
    return (
        <Col>
        <Button className="confirm-movement-button">Confirmar movimiento</Button>
        </Col>
    )
}

function NextTurnButton (){
    return (
        <Col>
        <Button className="next-turn-button">Siguiente turno</Button>
        </Col>
    )
}

function LeaveGameButton () {
    return (
        <Col>
        <Button className="leave-game-button" variant="danger">Abandonar partida</Button>
        </Col>
    );
}

export default function ButtonSet () {
    return (
        <Row className="justify-content-md-around p-3">
            <PedirCartasButton/>
            <ConfirmMovementButton/>
            <NextTurnButton/>
            <LeaveGameButton />
        </Row>     
        );
}