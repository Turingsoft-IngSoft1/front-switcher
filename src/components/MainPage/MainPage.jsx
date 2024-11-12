import { useState, useContext, useEffect } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import NewProfileButton from "./NewProfileButton";
import LoadProfileButton from "./LoadProfileButton";
import PlayAsInvitedButton from "./PlayAsInvitedButton";
import "../../styles/mainPage.css";

export default function MainPage({onNewProfile}) {
    const [profileId, setProfileId] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);
    
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
        setFadeIn(true);
    }, []);

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <div className={`main-page-container text-center ${fadeIn ? 'fade-in' : ''}`}>
                <Row className="g-4">
                    <Col xs={12}>
                        <div className="hover-scale">
                            <NewProfileButton onNewProfile={onNewProfile} className="button-mainpage" />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className="hover-scale">
                            <LoadProfileButton className="button-mainpage"/>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className="hover-scale" >
                            <PlayAsInvitedButton  className="button-mainpage"/>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
