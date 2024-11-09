import { useState, useContext, useEffect } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import NewProfileButton from "./NewProfileButton";
import LoadProfileButton from "./LoadProfileButton";

export default function MainPage() {


    return(
        <Container>
            <NewProfileButton />
            <LoadProfileButton />
        </Container>
    )
}