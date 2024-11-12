import { Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";

import { GameContext } from "../../contexts/GameContext.jsx";
export default function PlayAsInvitedButton() {
    const { setIsInvited, setFase } = useContext(GameContext);
    const text = "Jugar como invitado"
    const handleClick = () => {
        setIsInvited(true);
        setFase("crear");
    }
    return (
        <Button onClick={handleClick} className="button-mainpage">
            {text}
        </Button>
    );
}