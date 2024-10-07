import '../styles/cards.css';
import {Image, Container, Col, Row} from 'react-bootstrap';
import imgtest from '../styles/cards/fig01.svg'
import { useContext } from "react";
import { GameContext } from '../contexts/GameContext.jsx';
import React from 'react';
import Fig01 from '../styles/cards/fig01.svg';
import Fig02 from '../styles/cards/fig02.svg';
import Fig03 from '../styles/cards/fig03.svg';
import Fig04 from '../styles/cards/fig04.svg';
import Fig05 from '../styles/cards/fig05.svg';
import Fig06 from '../styles/cards/fig06.svg';
import Fig07 from '../styles/cards/fig07.svg';
import Fig08 from '../styles/cards/fig08.svg';
import Fig09 from '../styles/cards/fig09.svg';
import Fig10 from '../styles/cards/fig10.svg';
import Fig11 from '../styles/cards/fig11.svg';
import Fig12 from '../styles/cards/fig12.svg';
import Fig13 from '../styles/cards/fig13.svg';
import Fig14 from '../styles/cards/fig14.svg';
import Fig15 from '../styles/cards/fig15.svg';
import Fig16 from '../styles/cards/fig16.svg';
import Fig17 from '../styles/cards/fig17.svg';
import Fig18 from '../styles/cards/fig18.svg';
import Fige01 from '../styles/cards/fige01.svg';
import Fige02 from '../styles/cards/fige02.svg';
import Fige03 from '../styles/cards/fige03.svg';
import Fige04 from '../styles/cards/fige04.svg';
import Fige05 from '../styles/cards/fige05.svg';
import Fige06 from '../styles/cards/fige06.svg';
import Fige07 from '../styles/cards/fige07.svg';

function CardSwitcher ({imgsource, selected}) {
    return (
        <Container className="card-switcher">
            <Row>
                <Image src={imgsource} className="img-content"/>
            </Row>
        </Container>
    );
}

// ADVERTENCIA: Duplicacion de codigo
// si se cambia Horizontal, se cambia Vertical
export function CardSetHorizontal ({turn}) {
    const { playersTurns} = useContext(GameContext);
    const desiredPlayer = playersTurns.filter(player => player.turn === turn);
    return (
        <Row >
        <Col className="cardset-horizontal">
            <Row className= "justify-content-md-center">
                {desiredPlayer.name || "falta"}
            </Row>
            <Row className= "justify-content-md-center bg-cardset" >
                <Col xs="auto" className="carta">
                    <CardSwitcher imgsource={Fig01} />
                </Col>

                <Col xs="auto" className="carta">
                    <CardSwitcher imgsource={Fig02}/>
                </Col>

                <Col xs="auto" className="carta">
                    <CardSwitcher imgsource={Fig03}/>
                </Col>
            </Row>
        </Col>
        </Row>
    );
}

// ADVERTENCIA: Duplicacion de codigo
// si se cambia Horizontal, se cambia Vertical

export function CardSetVertical ({turn}) {
    const { playersTurns} = useContext(GameContext);
    const desiredPlayer = playersTurns.filter(player => player.turn === turn);
    return (
        <Col>
            <Row xs="auto">
                <h4> {desiredPlayer.name || "falta implementar"}</h4>
            </Row>
            <Row>
                <Col className="cardset-vertical align-items-center bg-cardset">
                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest}/>
                    </Row>

                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest}/>
                    </Row>

                    <Row xs="auto" className="carta">
                        <CardSwitcher imgsource={imgtest}/>
                    </Row>
                </Col>
            </Row>
        </Col>
    );
}