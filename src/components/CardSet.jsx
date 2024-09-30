import '../styles/cards.css';
import {Image, Container, Col, Row} from 'react-bootstrap';
import imgtest from '../styles/cards/fig01.svg'


function CardSwitcher ({imgsource}) {
    return (
        <Container className="card-switcher">
            <Row>
                <Image src={imgsource} className="img-content"/>
            </Row>
        </Container>
    );
}


export default function CardSet () {
    return (
        <>
        <Col xs="auto" className="carta">
        <CardSwitcher imgsource={imgtest}/>
        </Col>

        <Col xs="auto" className="carta">
        <CardSwitcher imgsource={imgtest}/>
        </Col>

        <Col xs="auto" className="carta">
        <CardSwitcher imgsource={imgtest}/>
        </Col>
        </>
    );
}