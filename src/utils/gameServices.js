import React from "react";

async function getPlayersInfo(idGame) {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/active_players/" + idGame,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }
        );

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

export async function getGameFigures(idGame) {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/game_status/" + idGame,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }
        );

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

export async function cancelGame(idGame, idPlayer) {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/cancel_game/" + idGame + "/" + idPlayer,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cancelling game:", error);
        return null;
    }
}

export async function getBoard(idGame) {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/board_status/" + idGame,
            {
                method: "GET",
                headers: { "Content-Type": "application/JSON" },
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const newBlockedColor = responseData.blocked_color;
        const boardData = responseData.board;
        const newBoard = Array(36).fill(null);
        let index = 0;
        boardData.forEach((row) => {
            row.forEach((cell) => {
                if (cell === "B") {
                    newBoard[index] = "primary";
                } else if (cell === "R") {
                    newBoard[index] = "danger";
                } else if (cell === "Y") {
                    newBoard[index] = "warning";
                } else if (cell === "G") {
                    newBoard[index] = "success";
                }
                index++;
            });
        });
        return {'board': newBoard, 'blocked_color': newBlockedColor};
        
    } catch (error) {
        console.log("Error fetching the board: ", error);
        return null;
    }
}

async function cancelMovements(idGame) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/cancel_moves/${idGame}`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cancel moves:", error);
        return null;
    }
}

export { getPlayersInfo, cancelMovements };

export async function sendMessage(idGame, idPlayer, message) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/chat/${idGame}/${idPlayer}?message=${encodeURIComponent(message)}`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending message:", error);
        return null;
    }
}

export async function obtainActiveGames(profile_id) {
    try {
        console.log("bueeno");
        console.log(profile_id);
        const response = await fetch(
            `http://127.0.0.1:8000/load_profile/${profile_id}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error obtaining active games:", error);
        return null;
    }
}