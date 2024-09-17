export default function CreateGame({ onCreateGame }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoId = 42; // TODO id partida
        onCreateGame(nuevoId)
    }
    return (
        <div className="form-partida">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Usuario:</label>
                    <input type="text" name="submitted-username"/>
                </div>
                <div className="form-group">
                    <label>Nombre de la partida:</label>
                    <input type="text" name="submitted-gametitle"/>
                </div>
                <button type="submit">Crear Partida</button>
            </form>
        </div>
    )
}
