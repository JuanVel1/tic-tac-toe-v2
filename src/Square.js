function Square({value, onSquareClick}) {
  return (
    <button className="cell" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export default Square;