import { useContext } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from '../contexts/GameContext.jsx';
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";

function ExitButton({intext}) {
    const { 
        idGame, idPlayer, setFase, setIsOwner, setIdPlayer, 
        setIdGame, setPlayers, setCurrentTurn, setBoard, setInfoPlayers,
        setFigureCards, setMovCards, setPlayersNames, setPlayersTurns, setWinner
    } = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);

    function exitGame() {
        fetch(`http://127.0.0.1:8000/leave_game`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "id_player": idPlayer,
                    "id_game": idGame
                }
            ),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success ExitGame:',data);
            // Reset GameContext
            setFase('crear');
            setShouldConnect(false);
            setIsOwner(false);
            setIdPlayer(null);
            setIdGame(null);
            setPlayers([]);
            setCurrentTurn(null);
            setBoard(Array(36).fill("dark"));
            setFigureCards([]);
            setMovCards([]);
            setPlayersNames([]);
            setInfoPlayers([]);
            setPlayersTurns([]);
            setWinner(false);
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

export default ExitButton;