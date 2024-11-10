import React from "react";
import { Button, Modal } from "react-bootstrap";
import { getRecoverGameData, getGameFigures } from "../utils/gameServices.js";
import { GameContext, GameProvider } from "../contexts/GameContext.jsx";
import { useState, useContext } from "react";
import { getCookie } from "../utils/cookie.js";
import { getFiguresOnBoard } from "../services/cardServices.js";
import { getPlayersInfo } from "../utils/gameServices.js";

function processBoard(prevBoard) {
    const newBoard = Array(36).fill(null);
    let index = 0;
    prevBoard.forEach((row) => {
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
    console.log("procesando tablero");
    console.log(newBoard);
    return newBoard;
}

function processMovCards(availableCards, partialCards) {
    const nonPlayedCards = availableCards.map((move) => [move, "nonplayed"]);
    const playedCards = partialCards.map((move) => [move, "played"]);
    console.log("procesando cardMovs");
    console.log([...nonPlayedCards, ...playedCards]);
    return [...nonPlayedCards, ...playedCards];
}

export default function JoinActiveGameButton({ selectedMatch }) {
    console.log("selectedMatchess");
    console.log(selectedMatch);
    const {
        setIdGame,
        setIdPlayer,
        setFase,
        setBoard,
        setInfoPlayers,
        setFiguresOnBoard,
        setMovCards,
        setNamePlayer,
        setPlayers,
        setPlayersNames,
        setPlayersTurns,
        setTurnPlayer,
    } = useContext(GameContext);

    const id_game = selectedMatch?.id_game;
    const id_player = selectedMatch?.id_user;
    const name_player = selectedMatch?.user_name;
    const handleClick = () => {
        getRecoverGameData(id_game, id_player)
            .then((data) => {
                setIdGame(id_game);
                setIdPlayer(id_player);
                setNamePlayer(name_player);
                setTurnPlayer(data.actual_turn_player);
                console.log("recuperando juego..");
                console.log(data);
                const newBoard = processBoard(data.actual_board);
                setBoard(newBoard);
                const newMovCards = processMovCards(
                    data.available_moves,
                    data.partial_moves
                );
                setMovCards(newMovCards);
                setFase("in-game");
            })
            .catch((error) => {
                console.error("Error recovering games: ", error);
            });
        getPlayersInfo(id_game)
            .then((data) => {
                console.log(data);
                if (data && data.users_list) {
                    const usersList = data.users_list.map((user) => user.id);
                    const playersTurns = data.users_list.map(
                        (user) => user.turn
                    );
                    const playersNames = data.users_list.map(
                        (user) => user.name
                    );
                    setPlayers(usersList);
                    setPlayersTurns(playersTurns);
                    setPlayersNames(playersNames);
                } else {
                    console.error("users_list is undefined");
                }
            })
            .catch((error) => {
                console.error("Error fetching players info:", error);
            });
        getGameFigures(id_game).then((data) => {
            if (data) {
                console.log("getGameFigures");
                console.log(data);
                setInfoPlayers(data);
            }
        });
        getFiguresOnBoard(id_game, id_player).then((newFiguresOnBoard) => {
            if (newFiguresOnBoard) {
                setFiguresOnBoard(newFiguresOnBoard);
            }
        });
    };

    return <Button onClick={handleClick}>Entrar</Button>;
}
