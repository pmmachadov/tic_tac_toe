import React from "react";

export default function Board({ board, winningCombo, onSquareClick }) {
  return (
    <div className="board">
      {board.map((value, index) => {
        const squareClass =
          winningCombo && winningCombo.includes(index) ? "highlight" : "";
        return (
          <button
            key={`square-${value}-${index}`}
            className={`square ${squareClass}`}
            onClick={() => onSquareClick(index)}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSquareClick(index);
            }}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
