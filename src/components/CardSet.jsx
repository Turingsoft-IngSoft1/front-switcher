import '../styles/cards.css';
import {Image, Container, Col, Card} from 'react-bootstrap';
import imgtest from '../styles/cards/descarga.jpg'


function CardSwitcher () {
    return (
        <Container className="card-switcher">
            <Image src={imgtest} />
        </Container>
    );
}


export default function CardSet () {
    return (
        <>
        <Col xs="auto" className="carta">
        <CardSwitcher />
        </Col>

        <Col xs="auto" className="carta">
        <CardSwitcher />
        </Col>

        <Col xs="auto" className="carta">
        <CardSwitcher />
        </Col>
        </>
    );
}