import {useEffect, useState, useContext} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Board.css'
import { GameContext } from '../contexts/GameContext.jsx';


function Tile({ variant, onTileClick, selected }) {
    return (
        <Button className={`tile ${selected ? 'selected' : ''}`}
                onClick={onTileClick} 
                variant={variant}>        
        </Button>
    );
}

export default function Board() {
    const { board, idPlayer, turnPlayer, selectedTiles, setSelectedTiles} = useContext(GameContext);
    const getTileVariant = (index) => {
        return board[index];
    };

    const handleTileClick = (index) => {
        if (idPlayer != turnPlayer){
            return;
        }
        setSelectedTiles((prevSelected) => {
            // Si la ficha ya está seleccionada, deseleccionarla
            if (prevSelected.includes(index)) {
                return prevSelected.filter(tileIndex => tileIndex !== index);
            }
            // Si ya hay 2 fichas seleccionadas, reemplazar la más antigua (el primer elemento)
            if (prevSelected.length === 2) {
                return [prevSelected[1], index]; // Reemplazar el primero por la nueva selección
            }
            // Si hay menos de 2 fichas seleccionadas, agregar la nueva ficha
            return [...prevSelected, index];
        });
    };


    return (
        <div className="tablero">
            <Container>
                {Array.from({ length: 6 }, (_, rowIndex) => (
                    <Row key={rowIndex} className="justify-content-md-center">
                        {Array.from({ length: 6 }, (_, colIndex) => {
                            const index = rowIndex * 6 + colIndex; // Calcular el índice de la tile
                            return (
                                <Col xs="auto" className="p-0" key={index}>
                                    <Tile variant={getTileVariant(index)}
                                          selected = {selectedTiles.includes(index)}
                                          onTileClick={()=> handleTileClick(index)}/>
                                </Col>
                            );
                        })}
                    </Row>
                ))}
            </Container>
        </div>
    );
}
