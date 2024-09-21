import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import MatchItem from './components/match.jsx'
import '../styles/list.css'

const ListMatches = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
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
    }, []);

    const handleJoinRequest = () => {
        if (selectedMatch) {
            // Send join request logic here
            console.log(`Joining match: ${selectedMatch.name}`);
        }
    };

    return (
        <Container>
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
                        data.map((match, key) => (
                            <MatchItem
                                key={key}
                                name={match.name}
                                quantPlayers={match.number_of_players}
                                minmaxPlayers={match.min_max_players}
                                onClick={() => setSelectedMatch(match)}
                                isSelected={selectedMatch && selectedMatch.name === match.name}
                            />
                        ))
                    ) : (
                        <tr><td colSpan="3">No hay partidas</td></tr>
                    )}
                </tbody>
            </Table>
            <Button variant='dark' onClick={handleJoinRequest} disabled={!selectedMatch}>
                Join Selected Match
            </Button>
        </Container>
    );
};

export default ListMatches;