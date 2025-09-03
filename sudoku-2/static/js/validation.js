import { addClass } from "./board";

export const knightMoves = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

// Initialize the occurrences map
export const numberOccurrences = new Map();

export function incrementOccurrence(num) {
  if (num >= 1 && num <= 9) {
    numberOccurrences.set(num, numberOccurrences.get(num) + 1);
  }
}

export function decrementOccurrence(num) {
  if (num >= 1 && num <= 9) {
    numberOccurrences.set(num, numberOccurrences.get(num) - 1);
  }
}

// Prevent placing numbers more than 9 times
export function isNumberActive(num) {
  if (num !== 0 && numberOccurrences.get(num) >= 9) {
    return false;
  }
  return true;
}

export function resetNumberOccurrences() {
  for (let i = 1; i <= 9; i++) {
    numberOccurrences.set(i, 0);
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== 0) {
        incrementOccurrence(num);
      }
    }
  }
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
        !isValidMove(i, j, board[i][j]) &&
        !cells[index].classList.contains("given")
      ) {
        addClass(cell, "error");
      }
    }
  }
}

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
      if (!isValidMove(i, j, board[i][j])) return false;
    }
  }
  return true;
}

export function solveSudoku(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // Find empty cells
      if (grid[i][j] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);

        // Try numbers 1-9 in random order
        // valid - place # and recurse
        // invalid - backtrack, try next number
        for (let num of numbers) {
          if (isValidPlacement(grid, i, j, num)) {
            grid[i][j] = num;

            if (solveSudoku(grid)) {
              return true;
            }

            grid[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

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
  for (let [dr, dc] of knightMoves) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
      if (grid[newRow][newCol] === num) return false;
    }
  }

  return true;
}

export function createPuzzle(level = "medium") {
  const levelSettings = {
    easy: { minClues: 40, maxClues: 45 },
    medium: { minClues: 34, maxClues: 39 },
    hard: { minClues: 28, maxClues: 33 },
  };

  const settings = levelSettings[level];
  const targetClues =
    Math.floor(Math.random() * (settings.maxClues - settings.minClues + 1)) +
    settings.minClues;
  const toRemove = 81 - targetClues;

  const cells = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells.push([i, j]);
    }
  }
  shuffleArray(cells);

  let removed = 0;
  for (let [row, col] of cells) {
    if (removed >= toRemove) break;

    // Try removing this cell
    const backup = board[row][col];
    board[row][col] = 0;

    // Check if puzzle still has unique solution
    if (hasUniqueSolution(board)) {
      // Yes then keep it removed
      removed++;
    } else {
      // No, then put the number back
      board[row][col] = backup;
    }
  }
}

export function hasUniqueSolution(grid) {
  const gridCopy = grid.map((row) => [...row]);
  let solutionCount = 0;

  function countSolutions(board) {
    if (solutionCount > 1) return; // Early exit if multiple found

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(board, i, j, num)) {
              board[i][j] = num;
              countSolutions(board);
              board[i][j] = 0;
            }
          }
          return;
        }
      }
    }
    solutionCount++; // Found a complete solution
  }

  countSolutions(gridCopy);
  return solutionCount === 1;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  