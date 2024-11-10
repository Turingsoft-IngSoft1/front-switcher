import {useState, useEffect, useContext} from "react";
import { Image, Container, Col, Row } from "react-bootstrap";

export default function Timer (){
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning){
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000); // cada 1s
        }
        else if (!isRunning && time !== 0){
            clearInterval(interval);
        }
        return () => clearInterval(interval); //limpia el intervalo
    }, [isRunning]);

    const startOrStop = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setTime(0);
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
        return `${minutes}:${secs}`;
    }

    return (
        <Container>
            <h2>Timer: {formatTime(time)}</h2>
            <button onClick={startOrStop}>{isRunning? 'Pausar' : 'Iniciar'}</button>
            <button onClick={reset} disabled={time===0}>Reiniciar</button>
        </Container>
    );
}