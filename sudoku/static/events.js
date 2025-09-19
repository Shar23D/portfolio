import {
  setSelectedNumber,
  resetGame,
  getHint,
  checkSolution,
  toggleNoteMode,
  showLevelPopup,
  hideLevelPopup,
  moveSelection,
  generateGame,
  clearSelected,
} from "./script.js";

//Attach all DOM event listeners (buttons, keyboard, clicks)
export function setupEventListeners() {
  // Top menu buttons
  document.getElementById("reset-btn")?.addEventListener("click", resetGame);
  document
    .getElementById("new-game-btn")
    ?.addEventListener("click", showLevelPopup);
  document.getElementById("hint-btn")?.addEventListener("click", getHint);
  document
    .getElementById("check-btn")
    ?.addEventListener("click", checkSolution);
  document
    .getElementById("note-btn")
    ?.addEventListener("click", toggleNoteMode);

  // Level modal
  document
    .getElementById("close-btn")
    ?.addEventListener("click", hideLevelPopup);
  document.querySelectorAll(".level-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const level = button.dataset.level;
      generateGame(level);
    });
  });

  // Number buttons (1–9 and x=0)
  document.querySelectorAll(".number-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const number = parseInt(button.dataset.number);
      setSelectedNumber(number);
    });
  });

  // Close popup / clear selection with outside clicks
  document.addEventListener("click", (e) => {
    const popup = document.getElementById("levelPopup");
    if (e.target === popup) hideLevelPopup();

    const gameElement = document.getElementById("game-area");
    if (gameElement && !gameElement.contains(e.target)) {
      clearSelected();
    }
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    // numbers
    if (e.key >= "1" && e.key <= "9") {
      setSelectedNumber(parseInt(e.key));
    }
    // clear
    if (e.key === "Delete" || e.key === "Backspace") {
      setSelectedNumber(0);
    }
    // quick actions
    if (e.key.toLowerCase() === "r") resetGame();
    if (e.key.toLowerCase() === "h") getHint();
    if (e.key.toLowerCase() === "n") toggleNoteMode();

    // arrow navigation
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const direction = e.key.replace("Arrow", "").toLowerCase();
      moveSelection(direction);
    }
  });
}
