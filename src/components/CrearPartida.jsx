export default function CrearPartida() {
    return (
        <div className="form-partida">
            <form action="">
                <div className="form-group">
                    <label>Usuario:</label>
                    <input type="text" name="submitted-username"/>
                </div>
                <div className="form-group">
                    <label>Nombre de la partida:</label>
                    <input type="text" name="submitted-gametitle"/>
                </div>
                <div className="form-group">
                    <label>Cantidad de jugadores:</label>
                    <input type="number" name="submitted-numberplayers"/>
                </div>
                <button type="submit">Crear Partida</button>
            </form>
        </div>
    )
}
