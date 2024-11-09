import { Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";

import { GameContext } from "../../contexts/GameContext.jsx";
export default function LoadProfileButton() {
    const { setFase } = useContext(GameContext);
    const text = "Cargar perfil"
    const handleClick = () => {
        setFase("crear");
    }
    return (
        <Button onClick={handleClick}>
            {text}
        </Button>
    );
}