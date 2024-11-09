import { Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../../contexts/GameContext.jsx";


export default function NewProfileButton() {
    const { setFase } = useContext(GameContext);
    const text = "Crear nuevo perfil"
    const handleClick = () => {
        setFase("crear");
    }
    return (
        <Button onClick={handleClick} variant="success">
            {text}
        </Button>
    );
}