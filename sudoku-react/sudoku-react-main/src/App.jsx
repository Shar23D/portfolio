import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import DifficultyModal from "./components/DifficultyModal";
import { findViolations } from "./utils/validation";
import { useEffect } from "react";
import { fetchPuzzle } from "./fetch-puzzle";

function App() {
  const [board, setBoard] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null))
  );

  const [puzzle, setPuzzle] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null))
  );

  const [solution, setSolution] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null))
  );

  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [violations, setViolations] = useState([]);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState("medium");
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [notes, setNotes] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(() => new Set()))
      .map((row) => row.map((cell) => cell()))
  );

  useEffect(() => {
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
      setCurrentDifficulty,
    });
  }, []);

  // Check for violations whenever board changes
  useEffect(() => {
    setViolations(findViolations(board));
  }, [board]);

  const handleCheck = () => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if (flatBoard.every((cell, i) => cell === flatSolution[i])) {
      setStatus("Correct!");

      let count = 0;
      const totalCells = 81;
      const interval = setInterval(() => {
        count++;
        setCorrectCount(count);
        if (count === totalCells) clearInterval(interval);
      }, 30);
    } else {
      setStatus("Incorrect, try again.");
    }
  };

  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setStatus("");
    setSelected(null);
    setCorrectCount(0);
    // Clear all notes
    setNotes(
      Array(9)
        .fill(null)
        .map(() =>
          Array(9)
            .fill(null)
            .map(() => new Set())
        )
    );
  };

  const handleNewPuzzle = () => {
    setShowDifficultyModal(true);
  };

  const handleDifficultySelect = (difficulty) => {
    setCurrentDifficulty(difficulty);
    setCorrectCount(0);
    setShowDifficultyModal(false);

    // Clear notes when getting new puzzle
    setNotes(
      Array(9)
        .fill(null)
        .map(() =>
          Array(9)
            .fill(null)
            .map(() => new Set())
        )
    );

    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
      setCurrentDifficulty,
      difficulty,
    });
  };
  const handleHint = () => {
    // Find incorrect non-prefilled cells
    const incorrectCells = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (
          puzzle[r][c] === null && // not a given
          board[r][c] !== null && // filled in by user
          board[r][c] !== solution[r][c] // but incorrect
        ) {
          incorrectCells.push([r, c]);
        }
      }
    }

    // If there are incorrect cells, correct one of them
    if (incorrectCells.length > 0) {
      const [r, c] =
        incorrectCells[Math.floor(Math.random() * incorrectCells.length)];
      const correctValue = solution[r][c];

      setBoard((prev) => {
        const newBoard = prev.map((row) => [...row]);
        newBoard[r][c] = correctValue;
        return newBoard;
      });

      setNotes((prev) => {
        const newNotes = prev.map((row) =>
          row.map((cellNotes) => new Set(cellNotes))
        );
        newNotes[r][c].clear();
        return newNotes;
      });

      setSelected([r, c]);
      setStatus("Fixed one incorrect cell.");
      return;
    }

    // No incorrect cells — fallback to hinting an empty one
    const emptyCells = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] === null && board[r][c] === null) {
          emptyCells.push([r, c]);
        }
      }
    }

    if (emptyCells.length === 0) {
      setStatus("No incorrect or empty cells left for a hint!");
      return;
    }

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const correctValue = solution[r][c];

    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      newBoard[r][c] = correctValue;
      return newBoard;
    });

    setNotes((prev) => {
      const newNotes = prev.map((row) =>
        row.map((cellNotes) => new Set(cellNotes))
      );
      newNotes[r][c].clear();
      return newNotes;
    });

    setSelected([r, c]);
    setStatus("Hint applied to an empty cell.");
  };

  const handleInput = (rIdx, cIdx, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const num = parseInt(value);

      if (isNoteMode) {
        // Toggle note
        setNotes((prev) => {
          const newNotes = prev.map((row) =>
            row.map((cellNotes) => new Set(cellNotes))
          );

          if (newNotes[rIdx][cIdx].has(num)) {
            newNotes[rIdx][cIdx].delete(num);
          } else {
            newNotes[rIdx][cIdx].add(num);
          }

          return newNotes;
        });

        // Don't modify board in note mode
        return;
      }

      // Regular input mode: set number and clear notes
      setBoard((prev) =>
        prev.map((row, r) =>
          row.map((cell, c) => {
            if (r === rIdx && c === cIdx) {
              return value ? num : null;
            }
            return cell;
          })
        )
      );

      // Clear notes for the cell
      setNotes((prev) => {
        const newNotes = prev.map((row) =>
          row.map((cellNotes) => new Set(cellNotes))
        );
        newNotes[rIdx][cIdx].clear();
        return newNotes;
      });
    }
  };

  // Handle keyboard input for number replacement and navigation
  const handleKeyDown = (e, rIdx, cIdx) => {
    const isPrefilled = puzzle[rIdx][cIdx] !== null;

    // Don't allow input if cell is prefilled
    if (isPrefilled && e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      return;
    }

    const key = e.key;

    // Handle arrow key navigation
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    ) {
      e.preventDefault();
      let newRow = rIdx;
      let newCol = cIdx;

      switch (key) {
        case "ArrowUp":
          newRow = Math.max(0, rIdx - 1);
          break;
        case "ArrowDown":
          newRow = Math.min(8, rIdx + 1);
          break;
        case "ArrowLeft":
          newCol = Math.max(0, cIdx - 1);
          break;
        case "ArrowRight":
          newCol = Math.min(8, cIdx + 1);
          break;
      }

      setSelected([newRow, newCol]);
      // Focus the new cell
      const newCell = document.querySelector(
        `input[data-row="${newRow}"][data-col="${newCol}"]`
      );
      if (newCell) {
        newCell.focus();
      }
      return;
    }

    // If user presses a number key (1-9), replace the current value or add/remove note
    if (key >= "1" && key <= "9") {
      e.preventDefault(); // Prevent default input behavior
      handleInput(rIdx, cIdx, key);
    } else if (key === "Delete" || key === "Backspace" || key === " ") {
      e.preventDefault();
      if (isNoteMode) {
        // In note mode, remove note at selected cell
        setNotes((prev) => {
          const newNotes = prev.map((row) =>
            row.map((cellNotes) => new Set(cellNotes))
          );
          newNotes[rIdx][cIdx].clear(); // Clear all notes in the cell
          return newNotes;
        });
      } else {
        // In input mode, clear the value
        handleInput(rIdx, cIdx, "");
      }
    }
    // Toggle note mode with 'N' key
    else if (key.toLowerCase() === "n") {
      e.preventDefault();
      setIsNoteMode(!isNoteMode);
    }
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!board) {
    return <div>Loading!</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Let's play Sudoku!</h1>
      <div className="difficulty-display">
        Current Difficulty:{" "}
        <span className="current-difficulty">
          {currentDifficulty.toUpperCase()}
        </span>
        {isNoteMode && <span className="note-indicator"> | NOTE MODE</span>}
      </div>
      <Grid
        board={board}
        handleInput={handleInput}
        puzzle={puzzle}
        selected={selected}
        setSelected={setSelected}
        correctCount={correctCount}
        violations={violations}
        handleKeyDown={handleKeyDown}
        notes={notes}
        isNoteMode={isNoteMode}
        selectedValue={selected ? board[selected[0]][selected[1]] : null}
      />

      {status && <div className="status">{status}</div>}

      <Controls
        handleCheck={handleCheck}
        handleReset={handleReset}
        handleNewPuzzle={handleNewPuzzle}
        isNoteMode={isNoteMode}
        setIsNoteMode={setIsNoteMode}
        handleHint={handleHint}
      />

      <DifficultyModal
        isOpen={showDifficultyModal}
        onClose={() => setShowDifficultyModal(false)}
        onSelectDifficulty={handleDifficultySelect}
      />
    </div>
  );
}

export default App;
