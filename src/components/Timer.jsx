import {useState, useEffect, useContext} from "react";
import { Image, Container, Col, Row } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext";
import '../styles/Timer.css'

export default function Timer (){
    const {time, setTime, turnPlayer} = useContext(GameContext)
    const formatTime = (seconds) => {
      const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
      const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
      return `${minutes}:${secs}`;
    }; 

    //cada vez que se cambie el turno del jugador, el timer se resetea
    useEffect(() => {
        setTime(120);
    }, [turnPlayer]);

    const progress = (time / 120) * 100;
    
    return (
      <Container className="timer-container">
          <svg className="timer-svg" viewBox="0 0 36 36">
              <circle className="timer-background" cx="18" cy="18" r="16" />
              <circle
                  className="timer-progress"
                  cx="18"
                  cy="18"
                  r="16"
                  style={{ strokeDasharray: 100, strokeDashoffset: 100 - progress }}
              />
          </svg>
          <div className="time-left">{formatTime(time)}</div>
      </Container>
  );
}