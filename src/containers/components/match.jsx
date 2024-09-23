
function MatchItem({name, quantPlayers, min_players, max_players, onClick, isSelected }) {
  return (
      <tr onClick={onClick} className={isSelected ? "selected" : ''}>
          <td className='match-name'>{name}</td>
          <td>{quantPlayers}</td>
          <td>{min_players} - {max_players}</td>
      </tr>
  );
}

export default MatchItem
