import { board, initialBoard, addClass, removeClass } from "./board";
import { numberOccurrences } from "./occurrencesCounter";
import { isValidPlacement } from "./validation";

export const statusElement = document.getElementById("status");
export let hintsUsed = 0;

export function highlightRelated(value) {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      // Highlight cells that contains the same number
      if (value > 0 && board[i][j] === value && index !== selectedCell) {
        addClass(cells[index], "highlight");
      }
    }
  }
}

export function clearHighlight() {
  // Clear all highlights
  document.querySelectorAll(".cell").forEach((cell) => {
    removeClass(cell, "highlight");
  });
}

// Handle number button state
export function updateNumberButtonState() {
  for (let i = 1; i <= 9; i++) {
    const button = document.getElementById(`number-${i}`);

    if (button instanceof HTMLButtonElement) {
      if (numberOccurrences.get(i) >= 9) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }
  }
}

function updateDisplay() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const cell = cells[i];
    const key = `${row}-${col}`;

    cell.innerHTML = "";

    if (board[row][col] !== 0) {
      // Main number
      cell.textContent = board[row][col];
      removeClass(cell, "note");
    } else if (notes[key]) {
      // Render notes
      addClass(cell, "note");
      for (let n = 1; n <= 9; n++) {
        const noteEl = document.createElement("span");
        noteEl.textContent = notes[key].includes(n) ? n : "";
        cell.appendChild(noteEl);
      }
    } else {
      removeClass(cell, "note");
      cell.textContent = "";
    }

    // Error state
    if (
      board[row][col] === 0 ||
      isValidPlacement(board, row, col, board[row][col])
    ) {
      removeClass(cell, "error");
    }

    // Given numbers
    if (initialBoard[row][col] !== 0) {
      addClass(cell, "given");
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
        !isValidPlacement(board, i, j, board[i][j]) &&
        !cells[index].classList.contains("given")
      ) {
        addClass(cell, "error");
      }
    }
  }
}

export function updateStatusDisplay(message) {
  statusElement.textContent = message;
  removeClass(statusElement, "win");
  addClass(statusElement, "visible");
  setTimeout(() => {
    statusElement.textContent = "";
    removeClass(statusElement, "visible");
  }, 5000);
}

export function winDisplay() {
  updateStatusDisplay("Perfect! You solved it correctly!");
  addClass(statusElement, "win");
  document.querySelectorAll(".cell").forEach((cell) => {
    removeClass(cell, "selected");
    removeClass(cell, "highlight");
    addClass(cell, "win");
  });
  stopTimer();
}

export function updateHintsDisplay() {
  document.getElementById("hintsUsed").textContent = toString(hintsUsed);
}

function updateLevelDisplay() {
  const levelNames = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };
  document.getElementById("level").textContent = levelNames[currentLevel];
}

function updateStatusDisplay(message) {
  statusElement.textContent = message;
  removeClass(statusElement, "win");
  addClass(statusElement, "visible");
  setTimeout(() => {
    statusElement.textContent = "";
    removeClass(statusElement, "visible");
  }, 5000);
}
