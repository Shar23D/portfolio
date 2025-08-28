const SUDOKU_API =
  "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution, difficulty}}}";
export const fetchPuzzle = async ({
  setError,
  setStatus,
  setPuzzle,
  setSolution,
  setBoard,
  setSelected,
  setCurrentDifficulty,
  difficulty = "easy",
}) => {
  try {
    setStatus("Loading...");

    const response = await fetch(
      "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty}}}",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (
      !data ||
      !data.newboard ||
      !data.newboard.grids ||
      !data.newboard.grids[0]
    ) {
      throw new Error("Invalid API response format");
    }

    const grid = data.newboard.grids[0];

    // Convert 0s to null for empty cells
    const puzzleGrid = grid.value.map((row) =>
      row.map((cell) => (cell === 0 ? null : cell))
    );

    const solutionGrid = grid.solution.map((row) =>
      row.map((cell) => (cell === 0 ? null : cell))
    );

    setPuzzle(puzzleGrid);
    setSolution(solutionGrid);
    setBoard(puzzleGrid.map((row) => [...row]));
    setSelected(null);
    setStatus("");
    setError("");

    if (setCurrentDifficulty) {
      setCurrentDifficulty(
        grid.difficulty ? grid.difficulty.toLowerCase() : difficulty
      );
    }
  } catch (err) {
    setError(`Error loading puzzle: ${err.message}`);
    setStatus("");
  }
};
