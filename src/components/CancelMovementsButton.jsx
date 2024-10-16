import { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { GameContext } from '../contexts/GameContext.jsx';
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";
import { cancelMovements } from "../utils/gameServices.js";


function rollBackPlayedCards(idGame, idPlayer) {
    console.log("VOLVIENDO ATRAs...");
    cancelMovements(idGame, idPlayer);
}

function hideButton(status, cardsPlayed){
    
    const isDisabled = status === 'disabled';
    const hasCardsPlayed = cardsPlayed.length > 0;
    console.log("-----");
    console.log(isDisabled ? 'isDisabled' : 'is not Disabled');
    console.log(hasCardsPlayed ? 'hasCardsPlayed' : 'has not cards played');
    console.log("-----");
    return !hasCardsPlayed || isDisabled 
}

export default function CancelMovementsButton({ status }) {
    const { idGame, idPlayer } = useContext(GameContext);

    return (
        <Col>
            <Button
                onClick={() => rollBackPlayedCards(idGame, idPlayer)}
                className="cancel-movements-button"
                variant="danger"
                disabled={hideButton(status, [])}
            >
                Cancelar Movimientos
            </Button>
        </Col>
    )
}