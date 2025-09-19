import {
  copyGrid,
  createEmptyGrid,
  shuffleArray,
  isValidPlacement,
  LEVEL_SETTINGS,
  clearAllHighlights,
} from "./helper.js";
import { setupEventListeners } from "./events.js";

// Game State
let board = createEmptyGrid(); // current game board
let solution = createEmptyGrid(); // solved board for hints/validation
let initialBoard = createEmptyGrid(); // given cells / for reset & non-editable

let selectedCell = null; // index 0..80 or null
let selectedNumber = 1;
let currentLevel = "medium";
let isNoteMode = false;
let notes = {}; // key "r-c" -> [1..9]

let startTime = null; // timer
let timerInterval = null;
let hintsUsed = 0;

// Number usage occurrences
const numberOccurrences = new Map();
for (let i = 1; i <= 9; i++) numberOccurrences.set(i, 0);

// Occurrence helpers
function incrementOccurrence(num) {
  if (num >= 1 && num <= 9)
    numberOccurrences.set(num, numberOccurrences.get(num) + 1);
}

function decrementOccurrence(num) {
  if (num >= 1 && num <= 9)
    numberOccurrences.set(num, numberOccurrences.get(num) - 1);
}

function resetNumberOccurrences() {
  for (let i = 1; i <= 9; i++) numberOccurrences.set(i, 0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const n = board[r][c];
      if (n !== 0) incrementOccurrence(n);
    }
  }
  updateNumberButtonState();
}

// UI: Board creation, selection, render
function createBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i.toString();
    cell.addEventListener("click", () => selectCell(i));
    boardElement.appendChild(cell);
  }
  updateDisplay();
}

export function selectCell(index) {
  const row = Math.floor(index / 9);
  const col = index % 9;

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

  // highlight same numbers
  highlightRelated(board[row][col]);
}

function highlightRelated(value) {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      if (value > 0 && board[i][j] === value && index !== selectedCell) {
        cells[index].classList.add("highlight");
      }
    }
  }
}
function clearHighlight() {
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.classList.remove("highlight"));
}
export function clearSelected() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("selected", "highlight");
  });
  selectedCell = null;
}

// Number buttons enable/disable based on occurrences
function updateNumberButtonState() {
  for (let i = 1; i <= 9; i++) {
    const btn = document.getElementById(`number-${i}`);
    if (btn instanceof HTMLButtonElement) {
      btn.disabled = numberOccurrences.get(i) >= 9;
    }
  }
}

// Place number / notes
export function setSelectedNumber(num) {
  selectedNumber = num;

  // Prevent placing numbers more than 9 times
  if (selectedNumber !== 0 && numberOccurrences.get(selectedNumber) >= 9) {
    updateStatusDisplay(`Number ${selectedNumber} has been used 9 times.`);
    return;
  }

  clearHighlight();
  highlightRelated(num);

  if (selectedCell === null) return;

  const row = Math.floor(selectedCell / 9);
  const col = selectedCell % 9;
  const cell = document.querySelectorAll(".cell")[selectedCell];

  // Block editing given or hinted cells
  if (initialBoard[row][col] !== 0 || cell.classList.contains("hinted")) {
    return;
  }

  const key = `${row}-${col}`;

  // NOTE MODE
  if (isNoteMode) {
    if (!notes[key]) notes[key] = [];

    if (num === 0) {
      delete notes[key];
    } else {
      if (numberOccurrences.get(num) >= 9) {
        updateStatusDisplay(`You can't note ${num}, it's used 9 times.`);
        return;
      }
      const idx = notes[key].indexOf(num);
      if (idx === -1) {
        notes[key].push(num);
        notes[key].sort();
      } else {
        notes[key].splice(idx, 1);
        if (notes[key].length === 0) delete notes[key];
      }
    }
    updateDisplay();
    return;
  }

  // NORMAL ENTRY
  const prevNum = board[row][col];
  if (prevNum !== 0) decrementOccurrence(prevNum);

  board[row][col] = num;
  delete notes[key];

  if (num !== 0) incrementOccurrence(num);

  updateNumberButtonState();
  clearHighlight();
  highlightRelated(num);
  updateDisplay();
  checkForErrors();

  if (isBoardComplete() && isValidSolution()) {
    winDisplay();
  }
}

// Render board (numbers, notes, classes)
function updateDisplay() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const cell = cells[i];
    const key = `${row}-${col}`;

    cell.innerHTML = "";

    if (board[row][col] !== 0) {
      cell.textContent = board[row][col];
      cell.classList.remove("note");
    } else if (notes[key]) {
      cell.classList.add("note");
      for (let n = 1; n <= 9; n++) {
        const noteEl = document.createElement("span");
        noteEl.textContent = notes[key].includes(n) ? n : "";
        cell.appendChild(noteEl);
      }
    } else {
      cell.classList.remove("note");
      cell.textContent = "";
    }

    if (board[row][col] === 0 || isValidMove(row, col, board[row][col])) {
      cell.classList.remove("error");
    }

    if (initialBoard[row][col] !== 0) {
      cell.classList.add("given");
    } else {
      cell.classList.remove("given");
    }
  }
}

// Error highlighting
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
      } else {
        cell.classList.remove("error");
      }
    }
  }
}

// Validity helpers
function isValidMove(row, col, num) {
  return isValidPlacement(board, row, col, num);
}

function isValidSolution() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!isValidMove(i, j, board[i][j])) return false;
    }
  }
  return true;
}

function isBoardComplete() {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) if (board[i][j] === 0) return false;
  return true;
}

// Game lifecycle
export function resetGame() {
  startTimer(); // restart timer
  board = copyGrid(initialBoard);
  selectedCell = null;
  notes = {};
  updateStatusDisplay("");
  updateDisplay();
  clearAllHighlights();
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("error", "selected", "highlight", "hinted", "win");
  });
  resetNumberOccurrences();
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

  // Generate full solution then carve a unique puzzle
  generateSolution();
  createPuzzle(currentLevel);

  // Set initial board & reset state
  initialBoard = copyGrid(board);
  selectedCell = null;
  hintsUsed = 0;
  isNoteMode = false;
  notes = {};

  // UI
  updateLevelDisplay();
  updateHintsDisplay();
  startTimer();
  resetNumberOccurrences();
  updateNumberButtonState();
  updateStatusDisplay("Have fun!");
  updateDisplay();

  // Remove transient classes
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("error", "selected", "highlight", "hinted", "win");
  });
}

function generateSolution() {
  board = createEmptyGrid();
  solveSudoku(board);
  solution = copyGrid(board);
}

function solveSudoku(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        for (const num of numbers) {
          if (isValidPlacement(grid, i, j, num)) {
            grid[i][j] = num;
            if (solveSudoku(grid)) return true;
            grid[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function createPuzzle(level = "medium") {
  const settings = LEVEL_SETTINGS[level] || LEVEL_SETTINGS.medium;
  const targetClues =
    Math.floor(Math.random() * (settings.maxClues - settings.minClues + 1)) +
    settings.minClues;
  const toRemove = 81 - targetClues;

  const cells = [];
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) cells.push([i, j]);
  shuffleArray(cells);

  let removed = 0;
  for (const [row, col] of cells) {
    if (removed >= toRemove) break;
    const backup = board[row][col];
    board[row][col] = 0;
    if (hasUniqueSolution(board)) {
      removed++;
    } else {
      board[row][col] = backup;
    }
  }
}

function hasUniqueSolution(grid) {
  const gridCopy = copyGrid(grid);
  let solutionCount = 0;

  function countSolutions(b) {
    if (solutionCount > 1) return;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (b[i][j] === 0) {
          for (let n = 1; n <= 9; n++) {
            if (isValidPlacement(b, i, j, n)) {
              b[i][j] = n;
              countSolutions(b);
              b[i][j] = 0;
            }
          }
          return;
        }
      }
    }
    solutionCount++;
  }

  countSolutions(gridCopy);
  return solutionCount === 1;
}

// Hints / Check / Notes / Win
export function getHint() {
  const emptyOrWrong = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (initialBoard[i][j] === 0 && board[i][j] !== solution[i][j]) {
        emptyOrWrong.push([i, j]);
      }
    }
  }
  if (!emptyOrWrong.length) return;

  const [row, col] =
    emptyOrWrong[Math.floor(Math.random() * emptyOrWrong.length)];
  const currentNum = board[row][col];
  const newNum = solution[row][col];

  if (currentNum !== 0) decrementOccurrence(currentNum);
  board[row][col] = newNum;
  incrementOccurrence(newNum);
  hintsUsed++;

  const index = row * 9 + col;
  const cells = document.querySelectorAll(".cell");
  cells[index].classList.add("hinted");

  updateNumberButtonState();
  updateHintsDisplay();
  updateDisplay();
  updateStatusDisplay("Hint used!");

  if (isBoardComplete() && isValidSolution()) {
    winDisplay();
  }
}

export function checkSolution() {
  if (!isBoardComplete()) {
    updateStatusDisplay("Puzzle is not complete yet.");
    return;
  }
  if (isValidSolution()) {
    winDisplay();
  } else {
    updateStatusDisplay("There are some errors. Keep trying!");
  }
}

export function toggleNoteMode() {
  isNoteMode = !isNoteMode;
  const noteBtn = document.getElementById("note-btn");
  if (isNoteMode) {
    noteBtn.classList.add("noteOn");
    document
      .querySelectorAll(".number-btn")
      .forEach((b) => b.classList.add("noteOn"));
    updateStatusDisplay("Note mode on");
  } else {
    noteBtn.classList.remove("noteOn");
    document
      .querySelectorAll(".number-btn")
      .forEach((b) => b.classList.remove("noteOn"));
    updateStatusDisplay("Note mode off");
  }
}

function winDisplay() {
  updateStatusDisplay("Perfect! You solved it correctly!");
  document.getElementById("status").classList.add("win");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("selected", "highlight");
    cell.classList.add("win");
  });
  stopTimer();
  setTimeout(() => {
    showLevelPopup();
  }, 5000);
}

// Timer & small UI
function startTimer() {
  stopTimer();
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
  if (!startTime) return;
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("timer").textContent = timeString;
}

function updateHintsDisplay() {
  document.getElementById("hintsUsed").textContent = hintsUsed;
}

function updateLevelDisplay() {
  const names = { easy: "Easy", medium: "Medium", hard: "Hard" };
  document.getElementById("level").textContent =
    names[currentLevel] || "Medium";
}

function updateStatusDisplay(message) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
  statusEl.classList.remove("win");
  statusEl.classList.add("visible");
  setTimeout(() => {
    statusEl.textContent = "";
    statusEl.classList.remove("visible");
  }, 5000);
}

// Keyboard navigation support
export function moveSelection(direction) {
  if (selectedCell === null) return;
  const row = Math.floor(selectedCell / 9);
  const col = selectedCell % 9;

  switch (direction) {
    case "left":
      if (col > 0) selectedCell--;
      break;
    case "right":
      if (col < 8) selectedCell++;
      break;
    case "up":
      if (row > 0) selectedCell -= 9;
      break;
    case "down":
      if (row < 8) selectedCell += 9;
      break;
  }
  selectCell(selectedCell);
}

// Boot
(function boot() {
  createBoard();
  generateGame(currentLevel);
  setupEventListeners();
})();
