// Obtener JSON de las cartas de mov dado un game y un player
export async function getMovementCards(idGame, idPlayer) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/get_moves/${idGame}/${idPlayer}`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            }
        );

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

// Obtener JSON de las cartas de figuras dado un game y un player
export async function getFigureCards(idGame, idPlayer) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/game_status/${idGame}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data[idPlayer];
    } catch (error) {
        console.error("Error fetching movement cards:", error);
        return null;
    }
}

/**
 * Juega una carta de figura en el juego.
 *
 * @param {Object} playFigureData - Los datos necesarios para jugar la carta de figura.
 * @param {number} playFigureData.id_game - ID del juego en el que se está jugando.
 * @param {number} playFigureData.id_player - ID del jugador que utilizó la carta.
 * @param {string} playFigureData.name - Nombre de la figura que se utilizó.
 * @param {Array<[number, number]>} playFigureData.pos - Lista de coordenadas donde se juega la carta.
 *
 * @returns {Promise<Object>} - La respuesta del servidor en formato JSON.
 * @throws {Error} - Si hay un problema al jugar la carta.
 */
export async function playFigureCard(playFigureData) {
    try {
        const response = await fetch("http://127.0.0.1:8000/play_figure_card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playFigureData),
        });

        if (!response.ok) {
            throw new Error("Error al jugar carta");
        }

        const responseData = await response.json();
        console.log("Carta jugada con éxito");
        return responseData;
    } catch (error) {
        console.error("Error:", error);
    }
}

/**
 * Obtiene las figuras formadas del tableri
 *
 * @param {number} idGame - ID del juego
 * @param {number} idPlayer - ID del jugador
 * @returns {Promise<Object>} - La respuesta del servidor en formato JSON.
 * @throws {Error} - Si hay un problema al obtener las figuras formadas
 */
export async function getFiguresOnBoard(idGame, idPlayer) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/detect_figures_on_board/${idGame}/${idPlayer}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching detection figures on board:", error);
        return null;
    }
}

// Obtener JSON de las cartas de figuras dado un game y un player
export async function getFiguresOnFinishTurn(idGame, idPlayer) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/get_figures/${idGame}/${idPlayer}`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching movement cards:", error);
        return null;
    }
}
export async function useMovementCard(movementData) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/use_moves`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movementData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("Error using movement: ", error);
        return null;
    }
}

export async function useFigureCard(figureData) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/use_figures`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(figureData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("Error using figure: ", error);
        return null;
    }
}
