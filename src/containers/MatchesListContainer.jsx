import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import MatchItem from './components/match.jsx';
import '../styles/list.css';

const ListMatches = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const fetchData = () => {
        fetch('/test/matchList.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                setError(error);
            });
    };

    useEffect(() => {
        fetchData();
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
                                    min_players={match.min_players}
                                    max_players={match.max_players}
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