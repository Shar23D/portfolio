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

export function isValidAntiknightMove(grid, row, col, num) {
  for (let [dr, dc] of knightMoves) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
      if (board[newRow][newCol] === num) return false;
    }
  }
  return true;
}
