import React from "react";
import { Button, Modal } from "react-bootstrap";
import { GameContext, GameProvider } from "../contexts/GameContext.jsx";
import { useState, useContext } from "react";
import { getCookie } from "../utils/cookie.js";

export default function JoinActiveGameButton({selectedMatch}) {
    return <Button> Entrar</Button>
}