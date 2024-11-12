import React, { useContext, useEffect } from "react";
import CardSetFig from "../components/CardSet.jsx";
import { getFigureCards } from "../services/cardServices.js";
import { GameContext } from "../contexts/GameContext.jsx";

export default function CardFigContainer({
    idOwnsSet,
    position,
    isHorizontal,
}) {
    const {
        idGame,
        idPlayer,
        infoPlayer,
        turnPlayer,
        figureCards,
        setFigureCards,
        fase,
    } = useContext(GameContext);
    useEffect(() => {
        const fetchFigureCards = async () => {
            const result = await getFigureCards(idGame, idPlayer);
            if (result) {
                setFigureCards(result);
            }
        };
        fetchFigureCards();
    }, [fase, turnPlayer, infoPlayer]);

    return (
        <CardSetFig
            idOwnsSet={idOwnsSet}
            position={position}
            isHorizontal={isHorizontal}
        />
    );
}
