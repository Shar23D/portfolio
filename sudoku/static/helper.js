// 9x9 array with each cell filled with 0
// Array(9).fill(): [undefined,...(x9)]
// .map(() => Array(9).fill(0)): create [0,0,0,0,0,0,0,0,0] for each undefined spot in the first array
// board: current game board for user
export function createEmptyGrid() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function copyGrid(grid) {
  return grid.map((row) => [...row]);
}

export function removeCellClass(...classes) {
  document.querySelectorAll(".cell").forEach((cell) => {
    classes.forEach((cls) => cell.classList.remove(cls));
  });
}
