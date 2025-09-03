import { addClass, removeClass } from "./board";

// Reset board to starting state
export function resetGame() {
  startTimer();
  board = initialBoard.map((row) => [...row]);
  selectedCell = null;
  updateStatusDisplay("");
  updateDisplay();
  document.querySelectorAll(".cell").forEach((cell) => {
    removeClass(cell,"error");
    removeClass(cell,"selected");
    removeClass(cell,"highlight");
    removeClass(cell,"hinted");
    removeClass(cell,"win");
  });
  resetNumberOccurrences();
  updateNumberButtonState();
  updateStatusDisplay("Game reset");
}

export function showLevelPopup() {
  document.getElementById("levelPopup").style.display = "flex";
}

export function hideLevelPopup() {
  document.getElementById("levelPopup").style.display = "none";
}

export function generateGame(level = "medium") {
  currentLevel = level;
  hideLevelPopup();

  // Clear previous selection
  document.querySelectorAll(".cell").forEach((cell) => {
    removeClass(cell,"error");
    removeClass(cell,"selected");
    removeClass(cell,"highlight");
    removeClass(cell,"hinted");
    removeClass(cell,"win");
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
  resetNumberOccurrences();
  updateNumberButtonState();

  updateStatusDisplay("Have fun!");
  updateDisplay();
}
export function generateSolution() {
  // Clear the board
  board = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  // Create a complete and valid sudoku board
  solveSudoku(board);
  solution = board.map((row) => [...row]);
}

export function getHint() {
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
      addClass(cells[index], "hinted");

      const hintNum = solution[row][col];
      incrementOccurrence(hintNum);

      updateNumberButtonState();

      updateHintsDisplay();
      updateDisplay();
      updateStatusDisplay("Error corrected with hint!");
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
      addClass(cells[index],"hinted");

      const hintNum = solution[row][col];
      incrementOccurrence(hintNum);

      updateNumberButtonState();

      updateHintsDisplay();
      updateDisplay();
      updateStatusDisplay("Hint used!");
    } else {
      updateStatusDisplay("No valid hint available!");
    }
  }
  if (isBoardComplete() && isValidSolution()) {
    winDisplay();
  }
}

export function checkSolution() {
  if (isBoardComplete()) {
    if (isValidSolution()) {
      winDisplay();
    } else {
      updateStatusDisplay("There are some errors. Keep trying!");
    }
  } else {
    updateStatusDisplay("Puzzle is not complete yet.");
  }
}
