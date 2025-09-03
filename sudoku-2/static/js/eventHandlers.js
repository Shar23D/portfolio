// Close popup and clear selected cell when clicking outside
document.addEventListener("click", (e) => {
    const popup = document.getElementById("levelPopup");
    if (e.target === popup) {
      hideLevelPopup();
    }
    const gameElement = document.getElementById("game-area");
    if (!gameElement.contains(e.target)) {
      clearSelected();
    }
  });
  
  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key >= "1" && e.key <= "9") {
      const num = parseInt(e.key);
      if (numberOccurrences.get(num) >= 9) {
        updateStatusDisplay(`Number ${num} is already used 9 times.`);
        return;
      }
      if (selectedCell !== null) {
        const row = Math.floor(selectedCell / 9);
        const col = selectedCell % 9;
        const cell = document.querySelectorAll(".cell")[selectedCell];
  
        // If the selected cell is a "given" cell, clear the selection
        if (initialBoard[row][col] !== 0 || cell.classList.contains("hinted")) {
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
    if (e.key.toLowerCase() === "r") {
      resetGame();
    }
    if (e.key.toLowerCase() === "h") {
      getHint();
    }
    if (e.key.toLowerCase() === "n") {
      toggleNoteMode();
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