import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleSquareClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
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
    for (let line of lines) {
      const [x, y, z] = line;
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }

    return null;
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner:${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`;
  return (
    <div className="game">
      <div className="game-info">{status}</div>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default Game;
