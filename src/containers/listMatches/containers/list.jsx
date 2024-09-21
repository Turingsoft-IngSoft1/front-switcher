import React, { useEffect, useState } from 'react';
import { Container, Table} from 'react-bootstrap';
import './list.css';
function MatchItem({ name, quantPlayers, minmaxPlayers }) {
    return (
        <>
            <td className='match-name'>{name}</td>
            <td>{quantPlayers}</td>
            <td>{minmaxPlayers}</td>
        </>
    );
}

const ListMatches = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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

    return (
                
        <Table className="table table-fixed" borderless hover variant="dark"> 
            <thead>
                <tr>
                    <th className='match-name'>Sala</th>
                    <th className='player-count'>Jugadores</th>
                    <th className='minmax-count'>Min/Max</th>
                </tr>
            </thead>
            <tbody>
                {error ? (
                    <p>Error cargando partidas: {error.message}</p>
                ) : data ? (
                            data.map((match, key) => (
                                <tr key={key}>
                                    <MatchItem
                                    name={match.name}
                                    quantPlayers={match.number_of_players}
                                    minmaxPlayers={match.min_max_players}
                                    />
                                </tr>
                            ))
                ) : (
                    <tr><td>No hay partidas</td></tr>
                )}
            </tbody>
            
        </Table>
    );
};

export default ListMatches;