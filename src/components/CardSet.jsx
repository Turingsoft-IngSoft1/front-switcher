import {Col, Card} from 'react-bootstrap';

function CardSwitcher () {
    return (
        <div className='card-switcher'>
        </div>
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