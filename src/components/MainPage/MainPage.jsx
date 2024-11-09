import { useState, useContext, useEffect } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import NewProfileButton from "./NewProfileButton";
import LoadProfileButton from "./LoadProfileButton";

export default function MainPage({onNewProfile}) {
    const [profileId, setProfileId] = useState(null);

    // Función para obtener el valor de una cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // useEffect para actualizar el estado de profileId cuando el componente se monta
    useEffect(() => {
        const id = getCookie("id");
        setProfileId(id);
    }, []);

    return (
        <Container>
            <p>ID guardado en la cookie: {profileId}</p>
            <NewProfileButton onNewProfile={onNewProfile}  />
            <LoadProfileButton />
        </Container>
    );
}
