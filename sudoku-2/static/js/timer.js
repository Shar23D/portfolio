// Timer variables
export let startTime = null;
export let timerInterval = null;

export function startTimer() {
  stopTimer(); // Clear any existing timer
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function updateTimer() {
  if (startTime) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.getElementById("timer").textContent = timeString;
  }
}
