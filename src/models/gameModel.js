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

export function checkWinnerFrom(board) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function initGame() {
  return {
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
  };
}

export function makeMove(gameState, index) {
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
      if (isBoardisFull) return "Board is Full";
      return null;
    })(),
  };
}

export function resetGame() {
  return initGame();
}
