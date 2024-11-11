import {useState, useEffect, useContext} from "react";
import { Image, Container, Col, Row } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext";

export default function Timer (){
    const [isRunning, setIsRunning] = useState(true);
    const {time, setTime, turnPlayer} = useContext(GameContext)
    

    //cada vez que se cambie el turno del jugador, el timer se resetea
    useEffect(() => {
        setTime(120);
        setIsRunning(true);
    }, [turnPlayer]);


    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            setIsRunning(false); // Detener el temporizador al llegar a 0
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

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
            <h2>Tiempo restante: {formatTime(time)}</h2>
        </Container>
    );
}