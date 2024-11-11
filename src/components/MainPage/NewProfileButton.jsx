import { Button } from "react-bootstrap";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext.jsx";

async function getNewProfile() {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/new_profile`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching new profile:", error);
        return null;
    }
}
export default function NewProfileButton({ onNewProfile }) {
    const { setFase } = useContext(GameContext);
    const text = "Crear nuevo perfil";
    const handleClick = async () => {
        const idFromServer = await getNewProfile(); // Obtiene el ID desde el servidor

        if (idFromServer) {
            // Guarda el ID en la cookie
            document.cookie = `id=${idFromServer}; path=/; max-age=${60 * 60 * 24};`;

            // Actualiza el estado del perfil en el componente principal
            onNewProfile(idFromServer);

            // Cambia la fase del juego
            setFase("crear");
        } else {
            console.error("No se pudo obtener un nuevo perfil.");
        }
    };

    return (
        <Button onClick={handleClick} variant="success" className="button-mainpage">
            {text}
        </Button>
    );
}
