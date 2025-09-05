const Controls = ({
  handleCheck,
  handleReset,
  handleNewPuzzle,
  isNoteMode,
  setIsNoteMode,
  handleHint,
}) => {
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={handleCheck} style={{ marginRight: 8 }}>
        Check
      </button>
      <button onClick={handleReset} style={{ marginRight: 8 }}>
        Reset
      </button>
      <button onClick={handleNewPuzzle} style={{ marginRight: 8 }}>
        New Puzzle
      </button>
      <button
        onClick={() => setIsNoteMode(!isNoteMode)}
        style={{
          marginRight: 8,
          backgroundColor: isNoteMode ? "#4CAF50" : "#f0f0f0",
          color: isNoteMode ? "white" : "black",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Notes
      </button>
      <button onClick={handleHint}>Hint</button>
    </div>
  );
};

export default Controls;
