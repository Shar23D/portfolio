// 9x9 array with each cell filled with 0
// Array(9).fill(): [undefined,...(x9)]
// .map(() => Array(9).fill(0)): create [0,0,0,0,0,0,0,0,0] for each undefined spot in the first array
// board: current game board for user
let board = Array(9)
  .fill()
  .map(() => Array(9).fill(0));
// solution: completed/solved board used for hints
let solution = Array(9)
  .fill()
  .map(() => Array(9).fill(0));
// initialBoard: puzzle board that is generated after removes # cells based on level; used to track given cells for reset and editable cells
let initialBoard = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

let selectedCell = null;
let selectedNumber = 1;
let currentLevel = "medium";

// Timer variables
let startTime = null;
let timerInterval = null;
let hintsUsed = 0;

const knightMoves = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

// Create 9x9 grid in HTML
function createBoard() {
  const boardElement = document.getElementById("board");
  // Clear previous board
  boardElement.innerHTML = "";
  // Create 81 div elements with class='cell' and click listener and index i (0-80)
  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => selectCell(i));
    boardElement.appendChild(cell);
  }
}

function selectCell(index) {
  // Eg: cell 6 is in row 6, col 0; cell 31 is in row 3, col 4
  const row = Math.floor(index / 9);
  const col = index % 9;

  // Can't select given numbers
  //if (initialBoard[row][col] !== 0) return;

  // Clear previous selection
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("selected", "highlight");
  });

  selectedCell = index;
  const cells = document.querySelectorAll(".cell");
  if (cells[index].classList.contains("given")) {
    cells[index].classList.add("highlight");
  } else {
    cells[index].classList.add("selected");
  }

  // Highlight same numbers
  highlightRelated(board[row][col]);
}

function highlightRelated(value) {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      // Highlight cells that contains the same number
      if (value > 0 && board[i][j] === value && index !== selectedCell) {
        cells[index].classList.add("highlight");
      }
    }
  }
}

function clearHighlight() {
  // Clear all highlights
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("highlight");
  });
}

// Set selected cell with the selected number
function setSelectedNumber(num) {
  selectedNumber = num;
  clearHighlight();
  highlightRelated(num);
  if (selectedCell !== null) {
    const row = Math.floor(selectedCell / 9);
    const col = selectedCell % 9;

    // Only modify non-given cells
    if (initialBoard[row][col] === 0) {
      board[row][col] = num;

      clearHighlight();
      highlightRelated(num);
      updateDisplay();
      checkForErrors();

      if (isBoardComplete() && isValidSolution()) {
        document.getElementById("status").textContent =
          "Congratulations! You solved it!";
        document.getElementById("status").classList.add("win");
      }
    }
  }
}

function clearSelected() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("selected", "highlight");
  });
  selectedCell = null;
}

function updateDisplay() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const cell = cells[i];

    // If the cell is 0, make it empty in HTML, otherwise add the given number to the cell
    cell.textContent = board[row][col] === 0 ? "" : board[row][col];

    // Only remove error if cell is now valid
    if (board[row][col] === 0 || isValidMove(row, col, board[row][col])) {
      cell.classList.remove("error");
    }

    // Remove highlight if it was hinted
    if (cell.classList.contains("hinted")) {
      cell.classList.remove("highlight");
    }

    // If the cell isn't 0, then there's a given number so add the class given to that cell element (for css)
    if (initialBoard[row][col] !== 0) {
      cell.classList.add("given");
    }
  }
}

// Highlight errored cells
function checkForErrors() {
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
        cell.classList.add("error");
      }
    }
  }
}

// Check if the number can be added in a cell
function isValidMove(row, col, num) {
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
function isBoardComplete() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return false;
    }
  }
  return true;
}

// Check if the board is solved
function isValidSolution() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!isValidMove(i, j, board[i][j])) return false;
    }
  }
  return true;
}

// Reset board to starting state
function resetGame() {
  board = initialBoard.map((row) => [...row]);
  selectedCell = null;
  document.getElementById("status").textContent = "";
  document.getElementById("status").classList.remove("win");
  updateDisplay();
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("error", "selected", "highlight", "hinted");
  });
}

function showLevelPopup() {
  document.getElementById("levelPopup").style.display = "flex";
}

function hideLevelPopup() {
  document.getElementById("levelPopup").style.display = "none";
}

function generateGame(level = "medium") {
  currentLevel = level;
  hideLevelPopup();

  // Clear previous selection
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("given", "error", "selected", "highlight", "hinted");
  });
  // Generate a complete valid Sudoku solution
  generateSolution();

  // Remove numbers to create puzzle
  createPuzzle(level);

  // Set up the game
  initialBoard = board.map((row) => [...row]);
  selectedCell = null;
  hintsUsed = 0;

  // Update displays
  updateLevelDisplay();
  updateHintsDisplay();
  startTimer();

  document.getElementById("status").textContent = "";
  document.getElementById("status").classList.remove("win");
  updateDisplay();
}

function generateSolution() {
  // Clear the board
  board = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  // Create a complete and valid sudoku board
  solveSudoku(board);
  solution = board.map((row) => [...row]);
}

function solveSudoku(grid) {
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

function isValidPlacement(grid, row, col, num) {
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

function createPuzzle(level = "medium") {
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

function hasUniqueSolution(grid) {
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getHint() {
  // Check for errors first
  checkForErrors();

  // Check for error cells that violate Sudoku rules
  const errorCellElements = document.querySelectorAll(".cell.error");
  const errorCells = [];

  errorCellElements.forEach((cell, index) => {
    const cellIndex = parseInt(cell.dataset.index);
    const row = Math.floor(cellIndex / 9);
    const col = cellIndex % 9;

    // Only include editable cells
    if (initialBoard[row][col] === 0) {
      errorCells.push([row, col]);
    }
  });

  if (errorCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * errorCells.length);
    const [row, col] = errorCells[randomIndex];

    // Check if placing a hint here violates the knight's move rule
    if (isValidMove(row, col, solution[row][col])) {
      board[row][col] = solution[row][col];
      hintsUsed++;

      const index = row * 9 + col;
      const cells = document.querySelectorAll(".cell");
      cells[index].classList.add("hinted");

      updateHintsDisplay();
      updateDisplay();
      document.getElementById("status").textContent =
        "Error corrected with hint!";
      return;
    }
  }

  // If no error cells, check empty cells for valid hint placement
  const emptyCells = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (initialBoard[i][j] === 0 && board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];

    // Check for knight's move violation before placing hint
    if (isValidMove(row, col, solution[row][col])) {
      board[row][col] = solution[row][col];
      hintsUsed++;

      const index = row * 9 + col;
      const cells = document.querySelectorAll(".cell");
      cells[index].classList.add("hinted");

      updateHintsDisplay();
      updateDisplay();
      document.getElementById("status").textContent = "Hint used!";
    } else {
      document.getElementById("status").textContent =
        "No valid hint available!";
    }
  }
}

function checkSolution() {
  if (isBoardComplete()) {
    if (isValidSolution()) {
      document.getElementById("status").textContent =
        "Perfect! You solved it correctly!";
      document.getElementById("status").classList.add("win");
    } else {
      document.getElementById("status").textContent =
        "There are some errors. Keep trying!";
    }
  } else {
    document.getElementById("status").textContent =
      "Puzzle is not complete yet.";
  }
}

// Timer functions
function startTimer() {
  stopTimer(); // Clear any existing timer
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimer() {
  if (startTime) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.getElementById("timer").textContent = timeString;
  }
}

function updateHintsDisplay() {
  document.getElementById("hintsUsed").textContent = hintsUsed;
}

function updateLevelDisplay() {
  const levelNames = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };
  document.getElementById("level").textContent = levelNames[currentLevel];
}

// Close popup when clicking outside
document.addEventListener("click", (e) => {
  const popup = document.getElementById("levelPopup");
  if (e.target === popup) {
    hideLevelPopup();
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "1" && e.key <= "9") {
    if (selectedCell !== null) {
      const row = Math.floor(selectedCell / 9);
      const col = selectedCell % 9;

      // If the selected cell is a "given" cell, clear the selection
      if (initialBoard[row][col] !== 0) {
        clearSelected();
      }
      if (initialBoard[row][col] === 0) {
        setSelectedNumber(parseInt(e.key));
      }
    }
    clearHighlight();
    highlightRelated(parseInt(e.key));
  }
  if (e.key === "Delete" || e.key === "Backspace") {
    setSelectedNumber(0);
  }
  if (e.key === "h" || e.key === "H") {
    getHint();
  }
  if (selectedCell != null) {
    highlightRelated(parseInt(e.key));
    if (e.key === "ArrowLeft") {
      if (selectedCell > 0) {
        selectedCell--;
      }
    }
    if (e.key === "ArrowRight") {
      if (selectedCell + 1 < 81) {
        selectedCell++;
      }
    }
    if (e.key === "ArrowUp") {
      if (selectedCell / 9 > 0) {
        selectedCell = selectedCell - 9;
      }
    }
    if (e.key === "ArrowDown") {
      if (selectedCell / 9 < 9) {
        selectedCell = selectedCell + 9;
      }
    }
    selectCell(selectedCell);
  }
});

document.addEventListener("click", (e) => {
  const gameElement = document.getElementById("game-area");

  // If the click is outside the board area, clear selection
  if (!gameElement.contains(e.target)) {
    clearSelected();
  }
});

// Initialize the game
createBoard();
generateGame(currentLevel);
