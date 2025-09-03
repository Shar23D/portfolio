import { board } from "./board";

export let currentLevel = "medium";

// Check if the number can be added in a cell
export function isValidMove(row, col, num) {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (j !== col && board[row][j] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if ((i !== row || j !== col) && board[i][j] === num) return false;
    }
  }

  // Check anti-knight constraint
  for (let [dr, dc] of knightMoves) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
      if (board[newRow][newCol] === num) return false; // Can't place the number in cells reachable by knight's move
    }
  }

  return true;
}
