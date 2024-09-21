
function MatchItem({ name, quantPlayers, minmaxPlayers, onClick, isSelected }) {
  return (
      <tr onClick={onClick} className={isSelected ? "selected" : ''}>
          <td className='match-name'>{name}</td>
          <td>{quantPlayers}</td>
          <td>{minmaxPlayers}</td>
      </tr>
  );
}

export default MatchItem
