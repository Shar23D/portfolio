export function solveSudoku(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // Find empty cells
      if (grid[i][j] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);

        // Try numbers 1-9 in random order
        // Valid - place # and recurse
        // Invalid - backtrack, try next number
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
