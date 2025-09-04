import { board } from "./board";
import { shuffleArray } from "./utils";
import { hasUniqueSolution } from "./solver";

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
