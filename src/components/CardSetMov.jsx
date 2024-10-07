import '../styles/cards.css';
import {Image, Container, Col, Row} from 'react-bootstrap';
import imgMovTest from '../styles/cards/mov1.svg'
import { useContext } from "react";
import { GameContext } from '../contexts/GameContext.jsx';

function MovementCard ({imgsource}) {
    return (
        <Container className="movement-card-switcher p-1" >
            <Row>
                <Image src={imgsource} className="img-content-mov"/>
            </Row>
        </Container>
    );
}

export default function CardSetMov () {
    return (
    <Row>
        <Col>
            <Row className= "justify-content-md-center">
                <Col xs="auto" className="p-1" >
                    <MovementCard imgsource={imgMovTest}/>
                </Col>

                <Col xs="auto" className="p-1">
                    <MovementCard imgsource={imgMovTest}/>
                </Col>

                <Col xs="auto" className="p-1">
                    <MovementCard imgsource={imgMovTest}/>
                </Col>
            </Row>
        </Col>
    </Row>
    );
    return 
}