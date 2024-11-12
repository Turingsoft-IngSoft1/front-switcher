import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { GameContext } from "../contexts/GameContext.jsx";
import { obtainActiveGames } from "../utils/gameServices.js";
import { getCookie } from "../utils/cookie.js";
import { MatchItemActiveList } from "./match.jsx";
import JoinActiveGameButton from "./JoinActiveGameButton.jsx";
import "../styles/list.css";

const ActiveList = () => {
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [listGames, setListGames] = useState([]);
    const [isFirst, setIsFirst] = useState(true);

    const fetchActiveGames = (profile_id) => {
        obtainActiveGames(profile_id)
            .then((data) => {
                console.log(data);
                setListGames(data);
            })
            .catch((error) => {
                setError(error);
                console.error("Error fetching active games: ", error);
            });
    };

    if(isFirst){
        fetchActiveGames(getCookie("id"));
        setIsFirst(false);
    }

    return (
        <div className="d-lg-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="me-3">Partidas activas:</h3>
            </div>
            <div className="d-flex flex-row justify-content-center mb-3">
                <Table
                    className="table table-fixed"
                    borderless
                    hover
                    variant="dark"
                >
                    <thead>
                        <tr>
                            <th className="match-name">Sala</th>
                            <th>Usuario</th>
                            <th>Jugadores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan="3">
                                    Error cargando partidas: {error.message}
                                </td>
                            </tr>
                        ) : listGames?.length > 0 ? (
                            listGames.map((match) => (
                                <MatchItemActiveList
                                    key={match.id}
                                    id={match.id_game}
                                    gameName={match.game_name}
                                    playerName={match.user_name}
                                    numPlayers={match.players}
                                    max_players={match.max_players}
                                    onClick={() => setSelectedMatch(match)}
                                    isSelected={selectedMatch && selectedMatch.id_game === match.id_game}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No hay partidas</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <JoinActiveGameButton selectedMatch={selectedMatch} />
                <Button 
                    id="refresh-btn" 
                    onClick={() => fetchActiveGames(getCookie("id"))}
                >
                    Refrescar
                </Button>
            </div>
        </div>
    );
};

export default ActiveList;
