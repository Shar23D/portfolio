import { board } from "./board";

// Initialize the occurrences map
export const numberOccurrences = new Map();

export function incrementOccurrence(num) {
  if (num >= 1 && num <= 9) {
    numberOccurrences.set(num, numberOccurrences.get(num) + 1);
  }
}

export function decrementOccurrence(num) {
  if (num >= 1 && num <= 9) {
    numberOccurrences.set(num, numberOccurrences.get(num) - 1);
  }
}

export function resetNumberOccurrences() {
  for (let i = 1; i <= 9; i++) {
    numberOccurrences.set(i, 0);
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== 0) {
        incrementOccurrence(num);
      }
    }
  }
}
