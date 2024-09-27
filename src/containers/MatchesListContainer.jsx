import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import MatchItem from '../components/match.jsx';
import '../styles/list.css';

const ListMatches = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const fetchData = () => {
        fetch('http://127.0.0.1:8000/list_games', {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue OK');
            }
            return response.json();
        })
        .then(data => {
            // Assuming setData expects the games_list array
            setData(data.games_list);
        })
        .catch(error => {
            console.error('Hubo un problema con tu operacion de fetch:', error);
            setError(error);
        });
    };

    useEffect(() => {
        setData([
            {
                "id": 1,
                "name": "Match 1ee",
                "number_of_players": 2,
                "min_players": 1,
                "max_players": 3
            },
            {
                "id": 2,
                "name": "Match 2",
                "number_of_players": 2,
                "min_players": 1,
                "max_players": 3
            }]);
    }, []);

    return (
        <div className='d-lg-flex flex-column'>
            <div className='d-flex flex-row justify-content-center'>
                <Table className="table table-fixed" borderless hover variant="dark">
                    <thead>
                        <tr>
                            <th className='match-name'>Sala</th>
                            <th>Jugadores</th>
                            <th>Min/Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr><td colSpan="3">Error cargando partidas: {error.message}</td></tr>
                        ) : data ? (
                            data.map((match) => (
                                <MatchItem
                                    key={match.id}
                                    id={match.id}
                                    name={match.name}
                                    quantPlayers={match.number_of_players}
                                    max_players={match.max_players}
                                    min_players={match.min_players}
                                    onClick={() => setSelectedMatch(match)}
                                    isSelected={selectedMatch && selectedMatch.id === match.id}
                                />
                            ))
                        ) : (
                            <tr><td colSpan="3">No hay partidas</td></tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ListMatches;