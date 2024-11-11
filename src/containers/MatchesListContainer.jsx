import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Form } from "react-bootstrap";
import MatchItem from "../components/match.jsx";
import JoinButton from "../components/JoinButton.jsx";
import "../styles/list.css";

const ListMatches = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");

    const fetchData = () => {
        fetch("http://127.0.0.1:8000/list_games", {
            headers: {
                accept: "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La respuesta de la red no fue OK");
                }
                return response.json();
            })
            .then((data) => {
                setData(data.games_list);
            })
            .catch((error) => {
                console.error(
                    "Hubo un problema con tu operacion de fetch:",
                    error
                );
                setError(error);
            });
    };

    const handleFilterChange = (value) => {
        setSelectedFilter((prevFilter) =>
            prevFilter === value ? "" : value
        );
    };

    const clearFilters = () => {
        setSelectedFilter("");
        setNameFilter("");
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="d-lg-flex flex-column">
            <div className="d-flex flex-row justify-content-center mb-3">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {selectedFilter === ""
                            ? "Mostrar Filtros"
                            : `${selectedFilter.split("-")[1]} ${
                                  selectedFilter.split("-")[1] === "1"
                                      ? "Lugar disponible"
                                      : "Lugares disponibles"
                              }`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>Lugares Disponibles</Dropdown.Header>
                        {[1, 2, 3].map((num) => (
                            <Dropdown.Item
                                key={num}
                                onClick={() =>
                                    handleFilterChange(`disponibles-${num}`)
                                }
                                className={
                                    selectedFilter === `disponibles-${num}`
                                        ? "selected-filter"
                                        : ""
                                }
                                style={{
                                    backgroundColor:
                                        selectedFilter === `disponibles-${num}`
                                            ? "grey"
                                            : "transparent",
                                }}
                            >
                                {`${num} ${
                                    num === 1 ? "Disponible" : "Disponibles"
                                }`}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={clearFilters}>
                            Limpiar Filtros
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    style={{ width: "200px", marginLeft: "10px" }}
                />
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
                            <th>Jugadores</th>
                            <th>Min/Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan="3">
                                    Error cargando partidas: {error.message}
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data
                                .filter((match) => {
                                    const availablePlayers =
                                        match.max_players - match.players;
                                    return (
                                        (selectedFilter === "" ||
                                            selectedFilter === `disponibles-${availablePlayers}`) &&
                                        match.name
                                            .toLowerCase()
                                            .startsWith(
                                                nameFilter.toLowerCase()
                                            )
                                    );
                                })
                                .filter(
                                    (match) => match.players < match.max_players
                                )
                                .map((match) => (
                                    <MatchItem
                                        key={match.id}
                                        id={match.id}
                                        name={match.name}
                                        quantPlayers={match.players}
                                        max_players={match.max_players}
                                        min_players={match.min_players}
                                        onClick={() => setSelectedMatch(match)}
                                        isSelected={
                                            selectedMatch &&
                                            selectedMatch.id === match.id
                                        }
                                        isPrivate = {match.private}
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
                <JoinButton selectedMatch={selectedMatch} />
                <div className="d-flex flex-row justify-content-start">
                    <Button id="refresh-btn" onClick={fetchData}>
                        Refrescar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ListMatches;
