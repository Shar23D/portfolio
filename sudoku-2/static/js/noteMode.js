import { addClass, removeClass } from "./board";
import { isNumberActive } from "./validation";

export let isNoteMode = false;
export let notes = {};

export function toggleNoteMode() {
  isNoteMode = !isNoteMode;
  let noteButton = document.getElementById("note-btn");
  if (isNoteMode) {
    handleNoteEntry();
    addClass(noteButton, "noteOn");
    document.querySelectorAll(".number-btn").forEach((button) => {
      addClass(button,"noteOn");
    });
    updateStatusDisplay("Note mode on");
  }
  if (!isNoteMode) {
    removeClass(noteButton, "noteOn")
    document.querySelectorAll(".number-btn").forEach((button) => {
      removeClass(button,"noteOn");
    });
    updateStatusDisplay("Note mode off");
  }
}

export function handleNotes(key, num) {
  if (!notes[key]) {
    notes[key] = [];
  }
  if (num === 0) {
    clearNotes(key);
  } else {
    if (!isNumberActive(num)) {
      updateStatusDisplay(`You can't note ${num}, it's used 9 times.`);
      return;
    }
    /*if (!isValidMove(row, col, num)) {
          return;
        }*/
    const idx = notes[key].indexOf(num);
    if (idx === -1) {
      notes[key].push(num);
      notes[key].sort();
    } else {
      notes[key].splice(idx, 1);
      if (notes[key].length === 0) {
        clearNotes(key);
      }
    }
  }
}

export function clearNotes(key) {
  delete notes[key];
}
