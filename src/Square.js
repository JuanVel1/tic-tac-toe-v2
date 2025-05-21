function Square({ value, onSquareClick, isWinning }) {
  let symbolClass = '';
  if (value === 'X') {
    symbolClass = 'x-symbol';
  } else if (value === 'O') {
    symbolClass = 'o-symbol';
  }

  return (
    <button className={`cell ${isWinning ? 'winning-cell' : ''}`} onClick={onSquareClick}>
      {value && <span className={`symbol-appear ${symbolClass}`}>{value}</span>}
    </button>
  );
}
export default Square;