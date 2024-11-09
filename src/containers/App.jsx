import { useContext, useEffect, useState } from "react";
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
import MainPage from "../components/MainPage/MainPage.jsx";

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

    const [profileId, setProfileId] = useState(null);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
    useEffect(() => {
        if (fase === "lobby") {
            // Activar la conexion del WebSocket
            setShouldConnect(true);
        }
    }, [fase]);

    useEffect(() => {
        const id = getCookie("id");
        setProfileId(id);
    }, []);

    const handleNewProfile = (newId) => {
        setProfileId(newId);
    };
    return (
        <Container className="pt-5">
            {fase === "inicial" && (
                <MainPage onNewProfile={handleNewProfile}/>
            )}
            {fase === "crear" && (
                <Col>
                    <Row md={12} className="mb-4">
                        <p>ID guardado en la cookie: {profileId}</p>
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
