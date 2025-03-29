import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "../App.css";
import Board from "./Board";
import { initGame } from "../models/gameModel";
import { handleSquareClick, handleReset } from "../controllers/gameController";

function App() {
  const [gameState, setGameState] = useState(initGame());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (gameState.winner && gameState.winner !== "Board is Full") {
      confetti({
        particleCount: 2000,
        spread: 500,
        origin: { y: 0.6 },
        colors: [
          "#bb0000",
          "#ffffff",
          "#00bb00",
          "#0000bb",
          "#bb00bb",
          "#00bbbb",
          "#bb00bb",
          "#ff0000",
          "#00ff00",
          "#ffff00",
          "#ff69b4",
          "#ffa500",
        ],
        shapes: ["circle"],
      });
    }
  }, [gameState.winner]);

  const onSquareClick = (index) => {
    const newState = handleSquareClick(gameState, index);
    setGameState(newState);
  };

  const onReset = () => {
    setGameState(handleReset());
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <button type="button" className="toggle-container" onClick={toggleTheme}>
        <div className="toggle-switch">
          <div className={`toggle-thumb ${darkMode ? "dark" : "light"}`}></div>
        </div>
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </button>

      <h1>Tic Tac Toe</h1>
      <Board
        board={gameState.board}
        winningCombo={gameState.winningCombo}
        onSquareClick={onSquareClick}
      />
      <div className="info">
        {gameState.winner ? (
          (() => {
            const winnerMessage =
              gameState.winner === "Board is Full" ? (
                <p>¡Board is full!</p>
              ) : (
                <p>Winner: {gameState.winner}</p>
              );
            return winnerMessage;
          })()
        ) : (
          <p>Turn: {gameState.turn}</p>
        )}
      </div>
      <button onClick={onReset}>Restart Game</button>
    </div>
  );
}

export default App;
