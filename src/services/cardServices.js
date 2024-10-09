// Obtener JSON de las cartas de mov dado un game y un player
async function getMovementCards(idGame, idPlayer) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_moves/${idGame}/${idPlayer}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movement cards:", error);
        return null;
    }
}

export default getMovementCards;