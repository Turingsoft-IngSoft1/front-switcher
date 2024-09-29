import {useEffect, useState, useContext} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Lobby.css'
import { GameContext } from '../contexts/GameContext.jsx';


function Tile({ variant, onTileClick }) {
    return (
        <Button className="tile" onClick={onTileClick} variant={variant}></Button>
    );
}

export default function Board() {
    const { board } = useContext(GameContext);

    const getTileVariant = (index) => {
        return board[index];
    };

    return (
        <div className="tablero">
            <Container>
                {Array.from({ length: 6 }, (_, rowIndex) => (
                    <Row key={rowIndex} className="justify-content-md-center">
                        {Array.from({ length: 6 }, (_, colIndex) => {
                            const index = rowIndex * 6 + colIndex; // Calcular el índice de la tile
                            return (
                                <Col xs="auto" key={index}>
                                    <Tile variant={getTileVariant(index)} />
                                </Col>
                            );
                        })}
                    </Row>
                ))}
            </Container>
        </div>
    );
}
