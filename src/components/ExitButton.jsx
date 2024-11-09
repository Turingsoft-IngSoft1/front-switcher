import { useContext } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext.jsx";
import { WebSocketContext, ChatWebSocketContext} from "../contexts/WebSocketContext.jsx";
import { cancelGame } from "../utils/gameServices.js";

function ExitButton({ intext }) {
    const {
        idGame,
        idPlayer,
        setFase,
        setIsOwner,
        setIdPlayer,
        winner,
        setIdGame,
        setPlayers,
        setCurrentTurn,
        setBoard,
        setInfoPlayers,
        fase,
        setFigureCards,
        setMovCards,
        setPlayersNames,
        setPlayersTurns,
        setWinner,
        isOwner,
    } = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);
    const { setShouldConnectChat } = useContext(ChatWebSocketContext);
    function resetGameContext() {
        setFase("crear");
        setShouldConnectChat(false);
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
        setWinner("false");
    }
    function exitGame() {
        if (isOwner && fase == "lobby") {
            cancelGame(idGame, idPlayer)
                .then((data) => {
                    console.log("Exit Game");
                    resetGameContext();
                })
                .catch((error) => {
                    console.error("Error ExitGame: ", error);
                });
        } else if (fase == "lobby" && winner == "cancelado") {
            console.log("Exit Game");
            resetGameContext();
        } else {
            fetch(`http://127.0.0.1:8000/leave_game`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_player: idPlayer,
                    id_game: idGame,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success ExitGame:", data);
                    resetGameContext();
                })
                .catch((error) => {
                    console.error("Error ExitGame: ", error);
                });
        }
    }
    return (
        <Button onClick={exitGame} className="exit-button" variant="danger">
            {intext}
        </Button>
    );
}

export default ExitButton;
