import {useState} from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

function Ficha({value, onFichaClick}){
    return(
        <Button className = "ficha" onClick={onFichaClick} variant = {value}></Button>
    );
}

function Tablero(){
    const [fichas, setFichas] = useState(Array(36).fill("dark"));

    function handleClick(i){
        const nextFicha = fichas.slice();

        switch (fichas[i]){
            case "primary":
                nextFicha[i] = "success";
                break;
            case "success":
                nextFicha[i] = "warning";
                break;
            case "warning":
                nextFicha[i] = "danger";
                break;
            case "danger":
                nextFicha[i] = "primary";
                break;
            default:
                nextFicha[i] = "primary";
                break;
        }
        
        setFichas(nextFicha);
    }

    return(
        <>
        <div className="tablero-row">
            <Ficha value = {fichas[0]} onFichaClick={() => handleClick(0)}/>
            <Ficha value = {fichas[1]} onFichaClick={() => handleClick(1)}/>
            <Ficha value = {fichas[2]} onFichaClick={() => handleClick(2)}/>
            <Ficha value = {fichas[3]} onFichaClick={() => handleClick(3)}/>
            <Ficha value = {fichas[4]} onFichaClick={() => handleClick(4)}/>
            <Ficha value = {fichas[5]} onFichaClick={() => handleClick(5)}/>
        </div>
        <div className="tablero-row">
            <Ficha value = {fichas[6]} onFichaClick={() => handleClick(6)}/>
            <Ficha value = {fichas[7]} onFichaClick={() => handleClick(7)}/>
            <Ficha value = {fichas[8]} onFichaClick={() => handleClick(8)}/>
            <Ficha value = {fichas[9]} onFichaClick={() => handleClick(9)}/>
            <Ficha value = {fichas[10]} onFichaClick={() => handleClick(10)}/>
            <Ficha value = {fichas[11]} onFichaClick={() => handleClick(11)}/>   
        </div>
        <div className="tablero-row">
            <Ficha value = {fichas[12]} onFichaClick={() => handleClick(12)}/>
            <Ficha value = {fichas[13]} onFichaClick={() => handleClick(13)}/>
            <Ficha value = {fichas[14]} onFichaClick={() => handleClick(14)}/>
            <Ficha value = {fichas[15]} onFichaClick={() => handleClick(15)}/>
            <Ficha value = {fichas[16]} onFichaClick={() => handleClick(16)}/>
            <Ficha value = {fichas[17]} onFichaClick={() => handleClick(17)}/>
        </div>
        <div className="tablero-row">
            <Ficha value = {fichas[18]} onFichaClick={() => handleClick(18)}/>
            <Ficha value = {fichas[19]} onFichaClick={() => handleClick(19)}/>
            <Ficha value = {fichas[20]} onFichaClick={() => handleClick(20)}/>
            <Ficha value = {fichas[21]} onFichaClick={() => handleClick(21)}/>
            <Ficha value = {fichas[22]} onFichaClick={() => handleClick(22)}/>
            <Ficha value = {fichas[23]} onFichaClick={() => handleClick(23)}/>          
        </div>
        <div className="tablero-row">
            <Ficha value = {fichas[24]} onFichaClick={() => handleClick(24)}/>
            <Ficha value = {fichas[25]} onFichaClick={() => handleClick(25)}/>
            <Ficha value = {fichas[26]} onFichaClick={() => handleClick(26)}/>
            <Ficha value = {fichas[27]} onFichaClick={() => handleClick(27)}/>
            <Ficha value = {fichas[28]} onFichaClick={() => handleClick(28)}/>
            <Ficha value = {fichas[29]} onFichaClick={() => handleClick(29)}/>  
        </div>
        <div className="tablero-row">
            <Ficha value = {fichas[30]} onFichaClick={() => handleClick(30)}/>
            <Ficha value = {fichas[31]} onFichaClick={() => handleClick(31)}/>
            <Ficha value = {fichas[32]} onFichaClick={() => handleClick(32)}/>
            <Ficha value = {fichas[33]} onFichaClick={() => handleClick(33)}/>
            <Ficha value = {fichas[34]} onFichaClick={() => handleClick(34)}/>
            <Ficha value = {fichas[35]} onFichaClick={() => handleClick(35)}/> 
        </div>        
        </>
    );
}

function ContainerFluidExample (){
    return (
        <Container>
            <Row>
                <Col><Button>1</Button></Col>
                <Col><Button>2</Button></Col>
                <Col><Button>3</Button></Col>
            </Row>
            <Row>
                <Col><Button>4</Button></Col>
                <Col><Button>5</Button></Col>
                <Col><Button>6</Button></Col>
            </Row>
            <Row>
                <Col><Button>7</Button></Col>
                <Col><Button>8</Button></Col>
                <Col><Button>9</Button></Col>
            </Row>

        </Container>
    );
}

export default function Lobby (){

    return (
        <>
        <Button size="lg">Siguiente turno</Button>
        <Button>Confirmar movimiento</Button>
        <Button>Pedir cartas</Button>
        <Tablero />
        <Button variant="danger">Abandonar partida</Button>
        <ContainerFluidExample />
        </>
    );
}