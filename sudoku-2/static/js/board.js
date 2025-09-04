import { isNumberActive } from "./validation";
import { incrementOccurrence, decrementOccurrence } from "./occurrencesCounter";
import { updateStatusDisplay, clearHighlight, highlightRelated } from "./ui";
import { handleNotes, clearNotes } from "./noteMode";

// 9x9 array with each cell filled with 0
// Array(9).fill(): [undefined,...(x9)]
// .map(() => Array(9).fill(0)): create [0,0,0,0,0,0,0,0,0] for each undefined spot in the first array
// board: current game board for user
export let board = Array(9)
  .fill()
  .map(() => Array(9).fill(0));
// solution: completed/solved board used for hints
export let solution = Array(9)
  .fill()
  .map(() => Array(9).fill(0));
// initialBoard: puzzle board that is generated after removes # cells based on level; used to track given cells for reset and editable cells
export let initialBoard = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

// Create 9x9 grid in HTML
export function createBoard() {
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

export function selectCell(index) {
  // Eg: cell 6 is in row 6, col 0; cell 31 is in row 3, col 4
  const row = calRow(index);
  const col = calCol(index);

  // Clear previous selection
  document.querySelectorAll(".cell").forEach((cell) => {
    removeClass(cell, "selected");
    removeClass(cell, "highlight");
  });

  selectedCell = index;
  const cells = document.querySelectorAll(".cell");
  if (cells[index].classList.contains("given")) {
    addClass(cells[index], "highlight");
  } else {
    addClass(cells[index], "selected");
  }
  // Highlight same numbers
  highlightRelated(board[row][col]);
}

// Set selected cell with the selected number
export function setSelectedNumber(num) {
  selectedNumber = num;
  // Prevent placing numbers more than 9 times
  if (!isNumberActive(selectedNumber)) {
    updateStatusDisplay(`Number ${selectedNumber} has been used 9 times.`);
    return;
  }
  clearHighlight();
  highlightRelated(num);

  const row = calRow(selectedCell);
  const col = calCol(selectedCell);
  if (selectedCell !== null) {
    const cell = document.querySelectorAll(".cell")[selectedCell];
    if (initialBoard[row][col] !== 0 || cell.classList.contains("hinted")) {
      return;
    }
    if (isNoteMode) {
      handleNotes(selectedCell, num);
    }
    updateDisplay();
    return;
  }

  // Store current number
  const prevNum = board[row][col];

  if (prevNum !== 0) {
    decrementOccurrence(prevNum);
  }

  board[row][col] = num;

  // Remove any notes if placing actual number
  clearNotes(selectedCell);

  if (num !== 0) {
    incrementOccurrence(num);
  }

  // Update the button's disabled state if the number is used up
  updateNumberButtonState();

  clearHighlight();
  highlightRelated(num);
  updateDisplay();
  checkForErrors();

  if (isBoardComplete() && isValidSolution()) {
    winDisplay();
  }
}

export function clearSelected() {
  document.querySelectorAll(".cell").forEach((cell) => {
    removeClass(cell, "selected");
    removeClass(cell, "highlight");
  });
  selectedCell = null;
}

export function addClass(element, label) {
  element.classList.remove(label);
}

export function removeClass(element, label) {
  element.classList.remove(label);
}

export function calRow(cell) {
  return Math.floor(cell / 9);
}

export function calCol(cell) {
  return cell % 9;
}
