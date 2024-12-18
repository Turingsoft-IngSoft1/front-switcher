import { useContext, useState } from "react";
import { Row, Col, Button, Container} from "react-bootstrap";
import { GameContext } from "../contexts/GameContext";
import ExitButton from "./ExitButton.jsx";
import CancelMovementsButton from "./CancelMovementsButton.jsx";
import Timer from './Timer.jsx';

function ConfirmMovementButton({ status, onConfirmMovementClick }) {
    switch (status) {
        case "disabled":
            return (
                <Col>
                    <Button className="confirm-movement-button" disabled>
                        Confirmar movimiento
                    </Button>
                </Col>
            );
        case "enabled":
            return (
                <Col>
                    <Button
                        className="confirm-movement-button"
                        onClick={onConfirmMovementClick}
                    >
                        Confirmar movimiento
                    </Button>
                </Col>
            );
        default:
            return null;
    }
}

function NextTurnButton({ onPassTurnClick, status }) {
    switch (status) {
        case "disabled":
            return (
                <Col>
                    <Button
                        className="next-turn-button"
                        onClick={onPassTurnClick}
                        disabled
                    >
                        Siguiente turno
                    </Button>
                </Col>
            );
        case "enabled":
            return (
                <Col>
                    <Button
                        className="next-turn-button"
                        onClick={onPassTurnClick}
                    >
                        Siguiente turno
                    </Button>
                </Col>
            );
        default:
            return null;
    }
}

function LeaveGameButton() {
    return (
        <Col>
            <ExitButton intext="Abandonar Sala" />
        </Col>
    );
}

export default function ButtonSet({ onPassTurn, onConfirmMovement }) {
    const {
        turnPlayer,
        idPlayer,
        idGame,
        selectedTiles,
        selectedMovementCard,
    } = useContext(GameContext);

    const indexToCoords = (index) => {
        const row = Math.floor(index / 6);
        const col = index % 6;
        return [row, col];
    };

    const handleNextTurnClick = (e) => {
        e.preventDefault();
        const turnData = {
            id_player: idPlayer,
            id_game: idGame,
        };
        onPassTurn(turnData);
    };

    const handleConfirmMovement = (e) => {
        e.preventDefault();
        const [pos1Index, pos2Index] = selectedTiles;
        const pos1 =
            pos1Index !== undefined ? indexToCoords(pos1Index) : [null, null];
        const pos2 =
            pos2Index !== undefined ? indexToCoords(pos2Index) : [null, null];

        const movementData = {
            id_game: idGame,
            id_player: idPlayer,
            name: selectedMovementCard[0], //movcard
            pos1: pos1, //pos1
            pos2: pos2, //pos2
        };
        onConfirmMovement(movementData);
    };

    if (turnPlayer == idPlayer) {
        return (
            <Container> 
            <Row className="justify-content-md-around p-3">
                <CancelMovementsButton status={"enabled"} />
                <ConfirmMovementButton
                    status={"enabled"}
                    onConfirmMovementClick={handleConfirmMovement}
                />
                <NextTurnButton
                    onPassTurnClick={handleNextTurnClick}
                    status={"enabled"}
                />
                <LeaveGameButton />
            </Row>
            </Container>
        );
    } else {
        return (
            <Container>
            <Row className="justify-content-md-around p-3">
                <CancelMovementsButton status={"disabled"} />
                <ConfirmMovementButton status={"disabled"} />
                <NextTurnButton status={"disabled"} />
                <LeaveGameButton />
            </Row>
            </Container>
        );
    }
}
