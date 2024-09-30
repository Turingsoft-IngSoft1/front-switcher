import { useContext } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from '../contexts/GameContext.jsx';


export default function ButtonSet({intext}) {
    const { 
        idGame, idPlayer, setFase, setIsOwner, setIdPlayer, 
        setIdGame, setPlayers, setCurrentTurn, setBoard, 
        setFigureCards, setMovCards
    } = useContext(GameContext);

    function exitGame() {
        fetch(`http://127.0.0.1:8000/leave_game?id_player=${idPlayer}&id_game=${idGame}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success ExitGame:',data);
            // Reset GameContext
            setFase('crear');
            setIsOwner(false);
            setIdPlayer(null);
            setIdGame(null);
            setPlayers([]);
            setCurrentTurn(null);
            setBoard(Array(36).fill("dark"));
            setFigureCards([]);
            setMovCards([]);
            //Websocket close
        })
        .catch((error) => {
            console.error('Error ExitGame: ', error);
        });
    }
    return (
        <Button onClick={exitGame} className="exit-button" variant="danger">{intext}</Button>
    );
}