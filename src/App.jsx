import React, { useState } from "react";
import "./App.css";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinnerFrom(board) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function initGame() {
  return {
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
  };
}

function makeMove(gameState, index) {
  const { board, turn, winner } = gameState;
  if (board[index] || winner) return gameState;

  const newBoard = board.slice();
  newBoard[index] = turn;

  const winnerFound = checkWinnerFrom(newBoard);
  const isBoardisFull =
    newBoard.every((square) => square !== null) && !winnerFound;
  const nextTurn = turn === "X" ? "O" : "X";

  return {
    board: newBoard,
    turn: winnerFound || isBoardisFull ? turn : nextTurn,
    winner: (() => {
      if (winnerFound) return winnerFound;
      if (isBoardisFull) return "BoardisFull";
      return null;
    })(),
  };
}

function resetGame() {
  return initGame();
}

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ board, onSquareClick }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}

function App() {
  const [gameState, setGameState] = useState(initGame());

  const handleSquareClick = (index) => {
    const newState = makeMove(gameState, index);
    setGameState(newState);
  };

  const handleReset = () => {
    setGameState(resetGame());
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board board={gameState.board} onSquareClick={handleSquareClick} />
      <div className="info">
        {gameState.winner ? (
          (() => {
            if (gameState.winner === "BoardisFull") {
              return <p>BoardisFull!</p>;
            } else {
              return <p>Winner: {gameState.winner}</p>;
            }
          })()
        ) : (
          <p>Turn: {gameState.turn}</p>
        )}
      </div>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;
