import React from 'react'

const getPlayersInfo = (idOfGame) => {
    console.log(idOfGame);
    return fetch('http://127.0.0.1:8000/active_players/' + idOfGame, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
};

export { getPlayersInfo };