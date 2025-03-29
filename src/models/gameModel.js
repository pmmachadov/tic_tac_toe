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

export function checkWinner(board) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  return null;
}

export function initGame() {
  return {
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
    winningCombo: null,
  };
}

export function makeMove(gameState, index) {
  const { board, turn, winner } = gameState;
  if (board[index] || winner) return gameState;

  const newBoard = board.slice();
  newBoard[index] = turn;

  const result = checkWinner(newBoard);
  const isBoardisFull = newBoard.every((square) => square !== null) && !result;
  const nextTurn = turn === "X" ? "O" : "X";

  return {
    board: newBoard,
    turn: result || isBoardisFull ? turn : nextTurn,
    winner: (() => {
      if (result) return result.winner;
      if (isBoardisFull) return "Board is Full";
      return null;
    })(),
    winningCombo: result ? result.combo : null,
  };
}

export function resetGame() {
  return initGame();
}
