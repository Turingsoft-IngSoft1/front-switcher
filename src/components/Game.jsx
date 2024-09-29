import {useState, useContext} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Lobby.css'
import { GameContext } from '../contexts/GameContext.jsx';
import Board from './Board.jsx';

export default function Game (){
    return (
        <Row>
            <Col xs="11">
                {/* Cartas del jugador 1, tablero jugador 3 */}     
                <h3>Componente Game :D</h3>
                <Board />
            </Col>
        </Row>
    );
}
