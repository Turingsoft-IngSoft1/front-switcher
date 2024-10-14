import React from 'react'

async function getPlayersInfo(idGame) {
    try {
        const response = await fetch('http://127.0.0.1:8000/active_players/' + idGame, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching players info:", error);
        return null;
    }
}


export { getPlayersInfo };