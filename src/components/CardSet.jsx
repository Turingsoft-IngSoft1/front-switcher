import React from 'react'
import { Card, Container, Button, Row, Col } from "react-bootstrap";

export default function CardSet (){
    return (
        <>
        <Col xs="auto" className="cardset"><Card className="card" style={{ width: '60px', height: '90px' }}></Card></Col>
        <Col xs="auto" className="cardset"><Card className="card" style={{ width: '60px', height: '90px' }}></Card></Col>
        <Col xs ="auto" className="cardset"><Card className="card" style={{ width: '60px', height: '90px' }}></Card></Col>
        </>
    );
}