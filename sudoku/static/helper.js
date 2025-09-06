//Constants
export const KNIGHT_MOVES = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

export const LEVEL_SETTINGS = {
  easy: { minClues: 40, maxClues: 45 },
  medium: { minClues: 34, maxClues: 39 },
  hard: { minClues: 28, maxClues: 33 },
};

//Grid utils
export function createEmptyGrid() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function copyGrid(grid) {
  return grid.map((row) => [...row]);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//Placement validation (classic + anti-knight)
export function isValidPlacement(grid, row, col, num) {
  if (num <= 0) return true; // allow empty

  // Row & column
  for (let j = 0; j < 9; j++)
    if (grid[row][j] === num && j !== col) return false;
  for (let i = 0; i < 9; i++)
    if (grid[i][col] === num && i !== row) return false;

  // 3x3 box
  const br = 3 * Math.floor(row / 3);
  const bc = 3 * Math.floor(col / 3);
  for (let i = br; i < br + 3; i++) {
    for (let j = bc; j < bc + 3; j++) {
      if ((i !== row || j !== col) && grid[i][j] === num) return false;
    }
  }

  // Anti-knight
  for (const [dr, dc] of KNIGHT_MOVES) {
    const r = row + dr,
      c = col + dc;
    if (r >= 0 && r < 9 && c >= 0 && c < 9 && grid[r][c] === num) return false;
  }

  return true;
}

//DOM helper
export function clearAllHighlights() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("error", "selected", "highlight", "hinted", "win");
  });
}
