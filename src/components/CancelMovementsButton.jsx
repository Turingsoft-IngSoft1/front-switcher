import { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext.jsx";
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";
import { cancelMovements } from "../utils/gameServices.js";

export default function CancelMovementsButton({ status }) {
    const { movCards, setMovCards, idGame, idPlayer } = useContext(GameContext);

    function rollBackPlayedCards(idGame, idPlayer) {
        cancelMovements(idGame);
        const newMovCards = [...movCards];
        for (const c in newMovCards) {
            if (newMovCards[c][1] === "played") {
                newMovCards[c][1] = "nonplayed";
            }
        }
        setMovCards(newMovCards);

        // TODO:
        // 1) Actualizar las movCards con estado 'played' a 'noplayed'
        //
        // map(mvc.status => 'noplayed')
        //
        // 2) "Refrescar tablero" es automatico ya que se recibe REFRESH_BOARD por ws
    }
    function hideButton(status) {
        const isDisabled = status === "disabled";
        let hasCardsPlayed = false;
        console.log(movCards);
        for (const mc in movCards) {
            if (movCards[mc][1] === "played") {
                hasCardsPlayed = true;
            }
        }
        console.log("-----");
        console.log(isDisabled ? "isDisabled" : "is not Disabled");
        console.log(hasCardsPlayed ? "hasCardsPlayed" : "has not cards played");
        console.log("-----");
        return !hasCardsPlayed || isDisabled;
    }

    return (
        <Col>
            <Button
                onClick={() => rollBackPlayedCards(idGame, idPlayer)}
                className="cancel-movements-button"
                variant="danger"
                disabled={hideButton(status)}
            >
                Cancelar Movimientos
            </Button>
        </Col>
    );
}
