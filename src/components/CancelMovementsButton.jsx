import { useContext } from "react";
import {  Row, Col, Button } from "react-bootstrap";
import { GameContext } from '../contexts/GameContext.jsx';
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";

export default function CancelMovementsButton ({status}){
    switch(status){
        case 'disabled':
            return (
                <Col>
                <Button className="cancel-movements-button" variant="danger" disabled>Cancelar Movimientos</Button>
                </Col>
            );
        case 'enabled':
            return (
                <Col>
                <Button className="cancel-movements-button" variant="danger">Cancelar Movimientos</Button>
                </Col>
            );
        default:
            return null;
    }

}