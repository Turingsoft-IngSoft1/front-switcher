function MatchItem({
    name,
    quantPlayers,
    max_players,
    min_players,
    onClick,
    isSelected,
}) {
    return (
        <tr onClick={onClick} className={isSelected ? "selected" : ""}>
            <td>{name}</td>
            <td>{quantPlayers}</td>
            <td>
                {min_players} - {max_players}
            </td>
        </tr>
    );
}

export function MatchItemActiveList( {gameName,
    playerName,
    numPlayers,
    onClick,
    isSelected
}) {
    return (
        <tr onClick={onClick} className={isSelected ? "selected" : ""}>
            <td>{gameName}</td>
            <td>{playerName}</td>
            <td>{numPlayers}</td>
        </tr>
    );
}

export default MatchItem;
