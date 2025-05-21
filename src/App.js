import React, { useState } from "react";
import Square from "./Square";
import "../src/styles.css";

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        // Check if there's a winner or if the square is already filled
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const gameResult = calculateWinner(squares);
    const currentWinner = gameResult ? gameResult.winner : null;
    const winningLine = gameResult ? gameResult.line : null;
    const isDraw = !currentWinner && squares.every(square => square !== null);
    const isGameOver = currentWinner || isDraw;

    let status;
    if (currentWinner) {
        status = 'Ganador: ' + currentWinner;
    } else if (isDraw) { // Check for a draw
        status = '¡Es un empate!';
    } else {
        status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <h1>Tic tac toe</h1>
            <h2 className={`status ${isGameOver ? 'game-over-status' : ''}`}>{status}</h2>
            {/* New Turn Indicator Section - Placed after status and before reset button */}
            {!currentWinner && !isDraw && (
                <div className="turn-indicator">
                    <span className={`player-symbol x ${xIsNext ? 'active' : ''}`}>X</span>
                    <span className={`player-symbol o ${!xIsNext ? 'active' : ''}`}>O</span>
                </div>
            )}
            <button onClick={() => reiniciar()} className="reset">
                {isGameOver ? 'Play Again?' : 'Reiniciar'}
            </button>
            <div className="grid">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinning={winningLine && winningLine.includes(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinning={winningLine && winningLine.includes(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinning={winningLine && winningLine.includes(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinning={winningLine && winningLine.includes(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinning={winningLine && winningLine.includes(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinning={winningLine && winningLine.includes(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinning={winningLine && winningLine.includes(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinning={winningLine && winningLine.includes(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinning={winningLine && winningLine.includes(8)} />
                </div>
            </div>
        </>
    );

    function reiniciar() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return { winner: null, line: null };
}

