import { makeMove, resetGame } from "../models/gameModel";

export function handleSquareClick(gameState, index) {
  return makeMove(gameState, index);
}

export function handleReset() {
  return resetGame();
}
