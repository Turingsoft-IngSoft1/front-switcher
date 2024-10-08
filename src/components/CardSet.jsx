import '../styles/cards.css';
import {Image, Container, Col, Row} from 'react-bootstrap';
import imgtest from '../styles/cards/fig01.svg'
import { useContext } from "react";
import { GameContext } from '../contexts/GameContext.jsx';


function CardSwitcher ({imgsource}) {
    return (
        <Container className="card-switcher">
            <Row>
                <Image src={imgsource} className="img-content"/>
            </Row>
        </Container>
    );
}


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
                    <CardSwitcher imgsource={imgtest}/>
                </Col>

                <Col xs="auto" className="carta">
                    <CardSwitcher imgsource={imgtest}/>
                </Col>

                <Col xs="auto" className="carta">
                    <CardSwitcher imgsource={imgtest}/>
                </Col>
            </Row>
        </Col>
        </Row>
    );
}

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