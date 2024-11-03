import { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MatchesList from "./MatchesListContainer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateGameContainer from "./CreateGameContainer.jsx";
import InGameContainer from "./InGameContainer.jsx";
import LobbyContainer from "./LobbyContainer.jsx";
import Game from "../components/Game.jsx";
import { GameContext, GameProvider } from "../contexts/GameContext.jsx";
import { WebSocketProvider } from "../contexts/WebSocketContext.jsx";
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";

function App() {
    return (
        <GameProvider>
            <WebSocketProvider>
                <Main />
            </WebSocketProvider>
        </GameProvider>
    );
}

const Main = () => {
    const { fase, idGame, idPlayer, players } = useContext(GameContext);
    const { setShouldConnect } = useContext(WebSocketContext);

    useEffect(() => {
        if (fase === "lobby") {
            // Activar la conexion del WebSocket
            setShouldConnect(true);
        }
    }, [fase]);

    return (
        <Container className="pt-5">
            {fase === "crear" && (
                <Col>
                    <Row md={12} className="mb-4">
                        <MatchesList />
                    </Row>
                    <Row md={12}>
                        <div className="bg-dark text-white p-3 rounded">
                            <CreateGameContainer />
                        </div>
                    </Row>
                </Col>
            )}
            {fase === "lobby" && <LobbyContainer />}
            {fase === "in-game" && <InGameContainer />}
        </Container>
    );
};

export default App;
