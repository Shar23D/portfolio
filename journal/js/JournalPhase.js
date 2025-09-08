export default class JournalPhase {
  constructor() {
    this.elements = {
      journalText: document.getElementById("journalText"),
      crumpleButton: document.getElementById("crumpleButton"),
      journalPhase: document.getElementById("journalPhase"),
    };
    this.eventListeners = {};
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.elements.journalText.addEventListener("input", () =>
      this.updateCrumpleButton()
    );
    this.elements.crumpleButton.addEventListener("click", () =>
      this.emit("crumple")
    );
  }

  updateCrumpleButton() {
    const hasText = this.elements.journalText.value.trim().length > 0;
    this.elements.crumpleButton.disabled = !hasText;
    this.elements.crumpleButton.textContent = hasText
      ? "Crumple Paper & Launch Into Space"
      : "Write something first...";
  }

  transitionOut() {
    const paper = document.querySelector(".paper");
    paper.style.animation = "paperDisintegrate 1s ease-in";

    return new Promise((resolve) => {
      setTimeout(() => {
        this.elements.journalPhase.style.display = "none";
        resolve();
      }, 1000);
    });
  }

  reset() {
    this.elements.journalPhase.style.display = "flex";
    this.elements.journalText.value = "";
    this.updateCrumpleButton();

    const paper = document.querySelector(".paper");
    paper.style.animation = "";
    paper.style.opacity = "1";
    paper.style.transform = "none";
  }

  on(event, callback) {
    this.eventListeners[event] = this.eventListeners[event] || [];
    this.eventListeners[event].push(callback);
  }
  emit(event, data) {
    if (this.eventListeners[event])
      this.eventListeners[event].forEach((cb) => cb(data));
  }
}
