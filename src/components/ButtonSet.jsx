import { useContext, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import {GameContext} from '../contexts/GameContext';
import ExitButton from './ExitButton.jsx';
import CancelMovementsButton from "./CancelMovementsButton.jsx";


function ConfirmMovementButton ({status}){
    switch(status){
        case 'disabled' :
            return (
                <Col>
                <Button className="confirm-movement-button" disabled>Confirmar movimiento</Button>
                </Col>
            );
        case 'enabled' :
            return(
                <Col>
                <Button className="confirm-movement-button">Confirmar movimiento</Button>
                </Col>
            );
        default:
            return null;
    }

}

function NextTurnButton ({onPassTurnClick, status}){
    switch(status){
        case 'disabled':
            return (
                <Col>
                <Button className="next-turn-button" onClick={onPassTurnClick} disabled>Siguiente turno</Button>
                </Col>
            );
        case 'enabled':
            return (
                <Col>
                <Button className="next-turn-button" onClick={onPassTurnClick}>Siguiente turno</Button>
                </Col>
            );
        default:
            return null;
    }

}

function LeaveGameButton () {
    return (
        <Col>
        <ExitButton intext="Abandonar Sala"/>
        </Col>
    );
}


export default function ButtonSet ({onPassTurn}) {
    const {turnPlayer, idPlayer, idGame} = useContext(GameContext);

    const handleNextTurnClick = (e) => {
        e.preventDefault();
        const turnData = {
            "id_player" : idPlayer,
            "id_game" : idGame
        };
        onPassTurn(turnData);
    }
    if (turnPlayer == idPlayer){
        return (
            <Row className="justify-content-md-around p-3">
                <CancelMovementsButton status={'enabled'}/>
                <ConfirmMovementButton status={'enabled'}/>
                <NextTurnButton onPassTurnClick = {handleNextTurnClick} status={'enabled'}/>
                <LeaveGameButton />
            </Row>     
        );
    }
    else {
        return (
            <Row className="justify-content-md-around p-3">
                <CancelMovementsButton status={'disabled'}/>
                <ConfirmMovementButton status={'disabled'}/>
                <NextTurnButton  status={'disabled'}/>
                <LeaveGameButton />
            </Row>      
        );
    }
}