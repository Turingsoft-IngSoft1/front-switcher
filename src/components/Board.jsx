import {useEffect, useState, useContext} from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import '../styles/Board.css'
import { GameContext } from '../contexts/GameContext.jsx';
import {useFigureCard} from '../services/cardServices.js';


function Tile({ variant, onTileClick, selected, figureMatch }) {
    return (
        <Button className={`tile ${selected ? 'selected' : ''}
                             ${figureMatch ? 'brighter-tile' : ''}`
                }
                onClick={onTileClick} 
                variant={variant}>        
        </Button>
    );
}




export default function Board() {
    const { board, idGame, idPlayer, turnPlayer, selectedFigureCard, figuresOnBoard, figureTile, setFigureTile, selectedTiles, setSelectedTiles} = useContext(GameContext);
    const getTileVariant = (index) => {
        return board[index];
    };
    const [tilesToMatch, setTilesToMatch] = useState([]);

    function checkAndFetchCompleteFigure(tileSelected, figureSelected) {
        if(figuresOnBoard[figureSelected]) {
            for (const color in figuresOnBoard[figureSelected]) {
                const coordinatesList = figuresOnBoard[figureSelected][color];
                for (const coordinates of coordinatesList) {
                    for(const tuple of coordinates){
                        if((tuple[0] == Math.floor(tileSelected/6)) &&(tuple[1] == tileSelected % 6)) {
                            
                            console.log('FIGURA ' + figureSelected + ' FETCHEADA');
                            const figureData = 
                                {
                                    "id_game": idGame,
                                    "id_player": idPlayer,
                                    "name": figureSelected,
                                    "figure_pos": coordinates
                                };
                            useFigureCard(figureData);
                        }
                    }
                }
            }
       }
    };

    useEffect(() => {
        const obtainAllTiles = () => {
            const allTiles = [];
            for (const fig in figuresOnBoard) {
                for (const color in figuresOnBoard[fig]) {
                    const coordinatesList = figuresOnBoard[fig][color];
                    for (const coordinates of coordinatesList) {
                        for (const [i, j] of coordinates) {
                            allTiles.push(i * 6 + j);
                        }
                    }
                }
            }
            return allTiles;
        };
        
        setTilesToMatch(obtainAllTiles()); // Actualiza el estado de tilesToMatch
    }, [figuresOnBoard]);
    
    const handleTileClick = (index) => {
        if (idPlayer != turnPlayer){
            console.log("Selección permitida solo en turno propio");
            return;
        }
        if(selectedFigureCard){
            checkAndFetchCompleteFigure(index, selectedFigureCard['nameFig']);
            setFigureTile(figureTile == index? null : index);
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
                                          figureMatch={tilesToMatch.includes(index)}
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
