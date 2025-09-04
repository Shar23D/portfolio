import { isValidAntiknightMove } from "./antiknightMode";
import { addClass } from "./board";
import { numberOccurrences } from "./occurrencesCounter";

// Prevent placing numbers more than 9 times
export function isNumberActive(num) {
  if (num !== 0 && numberOccurrences.get(num) >= 9) {
    return false;
  }
  return true;
}

// Highlight errored cells
export function checkForErrors() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      const cell = cells[index];

      if (
        board[i][j] !== 0 &&
        !isValidPlacement(board, i, j, board[i][j]) &&
        !cells[index].classList.contains("given")
      ) {
        addClass(cell, "error");
      }
    }
  }
}

// Check if all cells are filled
export function isBoardComplete() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return false;
    }
  }
  return true;
}

// Check if the board is solved
export function isValidSolution() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!isValidPlacement(board, i, j, board[i][j])) return false;
    }
  }
  return true;
}

// Check all anti-kngiht rules if a number can be placed in a cell
export function isValidPlacement(grid, row, col, num) {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (grid[row][j] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (grid[i][j] === num) return false;
    }
  }

  // Check anti-knight constraint
  // future refactor if there're other modes, then check if anti-knight mode is on
  if (!isValidAntiknightMove(grid, row, col, num)) {
    return false;
  }

  return true;
}
