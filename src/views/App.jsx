import React, { useState } from "react";
import "../App.css";
import Board from "./Board";
import { initGame } from "../models/gameModel";
import { handleSquareClick, handleReset } from "../controllers/gameController";

function App() {
  const [gameState, setGameState] = useState(initGame());

  const onSquareClick = (index) => {
    const newState = handleSquareClick(gameState, index);
    setGameState(newState);
  };

  const onReset = () => {
    setGameState(handleReset());
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board board={gameState.board} onSquareClick={onSquareClick} />
      <div className="info">
        {gameState.winner ? (
          gameState.winner === "BoardisFull" ? (
            <p>BoardisFull!</p>
          ) : (
            <p>Winner: {gameState.winner}</p>
          )
        ) : (
          <p>Turn: {gameState.turn}</p>
        )}
      </div>
      <button onClick={onReset}>Reset Game</button>
    </div>
  );
}

export default App;
