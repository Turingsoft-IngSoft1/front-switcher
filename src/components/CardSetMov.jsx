import '../styles/cards.css';
import {Image, Container, Col, Row} from 'react-bootstrap';
import bigdiagonal from '../styles/cards/mov1.svg';
import bigline from     '../styles/cards/mov2.svg';
import simpleline from '../styles/cards/mov3.svg';
import simplediagonal  from   '../styles/cards/mov4.svg';
import mirrorL from '../styles/cards/mov5.svg';
import rightL from   '../styles/cards/mov6.svg';
import lateral from  '../styles/cards/mov7.svg';
import { useContext, useState } from "react";
import { GameContext } from '../contexts/GameContext.jsx';

/* 
    imgsource: fuente de la imagen, son las que estan en import
    selected: bool, la carta esta actualmente seleccionada
    played: bool, la carta ya fue jugada, se deberia ver mas transparente
*/
function MovementCard ({imgsource, onSelect, selected, borderColor}) {
    return (
        <Container className={`movement-card-switcher p-1 ${selected ? 'selected' : ''}`}
                   style = {selected ? { border: `3px solid ${borderColor}` } : {}}
                   onClick = {onSelect}>
            <Row>
                <Image src={imgsource} className="img-content-mov"/>
            </Row>
        </Container>
    );
}

export default function CardSetMov ({requestNewCards}) {
    const [borderColor, setBorderColor] = useState("");
    
    const { idGame, idPlayer, turnPlayer, movCards, fase, selectedMovementCard, setSelectedMovementCard} = useContext(GameContext);

    const getRandomColor = () => {
        const colors = ['#dc3545', '#198754', '#0d6efd', '#ffc107']; //RGBY
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function handleSelect (i) {
        if (selectedMovementCard && selectedMovementCard[1] === i){
            setSelectedMovementCard([null, null]);
            setBorderColor("");
        }
        else {
            const movKey = movCards[i];
            console.log("MovKey " + movKey);
            setSelectedMovementCard([movKey, i]);
            setBorderColor(getRandomColor());
        }
    }

    const dictImg = {
        'mov1': bigdiagonal,
        'mov2': bigline,
        'mov3': simpleline,
        'mov4': simplediagonal,
        'mov5': mirrorL,
        'mov6': rightL,
        'mov7': lateral
    }

    const imgCard1 = dictImg[movCards[0]];
    const imgCard2 = dictImg[movCards[1]];
    const imgCard3 = dictImg[movCards[2]];
    return (
    <Row>
        <Col>
            <Row className= "justify-content-md-center">
                <Col xs="auto" className="p-1" >
                    <MovementCard imgsource={imgCard1} selected={selectedMovementCard && selectedMovementCard[1] === 0} borderColor={selectedMovementCard && selectedMovementCard[1] === 0 ? borderColor : ""} onSelect={() => handleSelect(0)}/>
                </Col>

                <Col xs="auto" className="p-1">
                    <MovementCard imgsource={imgCard2} selected={selectedMovementCard && selectedMovementCard[1] === 1} borderColor={selectedMovementCard && selectedMovementCard[1] === 1 ? borderColor : ""} onSelect={() =>handleSelect(1)}/>
                </Col>

                <Col xs="auto" className="p-1">
                    <MovementCard imgsource={imgCard3} selected={selectedMovementCard && selectedMovementCard[1] === 2} borderColor={selectedMovementCard && selectedMovementCard[1] === 2 ? borderColor : ""} onSelect={() => handleSelect(2)}/>
                </Col>
            </Row>
        </Col>
    </Row>
    );
}