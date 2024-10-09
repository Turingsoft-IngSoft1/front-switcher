import react, {useContext, useEffect} from 'react';
import { GameContext } from '../contexts/GameContext.jsx';

export const usePlayersInfo = () => {
    const {idGame, setPlayers, setPlayersTurns, setPlayersNames} = useContext(GameContext);

    fetch('http://127.0.0.1:8000/active_players/' + idGame, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const usersList = data.users_list.map(user => user.id);
        const playersTurns = data.users_list.map(user => user.turn);
        const playersNames = data.users_list.map(user => user.name);
        setPlayers(usersList);
        setPlayersTurns(playersTurns);
        setPlayersNames(playersNames);

    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
};