export class GamePhase {
  constructor() {
    this.elements = {
      paperBall: document.getElementById("paperBall"),
      powerFill: document.getElementById("powerFill"),
      powerText: document.getElementById("powerText"),
    };

    this.isCharging = false;
    this.power = 0;
    this.maxPower = 100;
    this.chargeInterval = null;
    this.eventListeners = {};

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.elements.paperBall.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.startCharging();
    });

    this.elements.paperBall.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.startCharging();
    });

    document.addEventListener("mouseup", () => {
      if (this.isCharging) {
        this.launch();
      }
    });

    document.addEventListener("touchend", () => {
      if (this.isCharging) {
        this.launch();
      }
    });

    document.addEventListener("mouseleave", () => {
      if (this.isCharging) {
        this.launch();
      }
    });

    document.addEventListener("touchcancel", () => {
      if (this.isCharging) {
        this.launch();
      }
    });
  }

  activate() {
    this.reset();
  }

  startCharging() {
    this.isCharging = true;
    this.power = 0;
    this.elements.paperBall.classList.add("charging");
    this.elements.powerText.textContent = "Charging launch...";

    this.chargeInterval = setInterval(() => {
      this.power = Math.min(this.power + 1.5, this.maxPower);
      this.elements.powerFill.style.width = `${this.power}%`;
      this.elements.powerText.textContent = `Power: ${Math.floor(this.power)}%`;
    }, 50);
  }

  launch() {
    if (!this.isCharging) return;

    this.isCharging = false;
    clearInterval(this.chargeInterval);
    this.elements.paperBall.classList.remove("charging");

    if (this.power < 5) {
      this.elements.powerText.textContent = "Hold longer for more power";
      return;
    }

    this.emit("launch", this.power);
  }

  reset() {
    this.power = 0;
    this.elements.powerFill.style.width = "0%";
    this.elements.powerText.textContent =
      "Hold the paper to charge your launch";
    this.isCharging = false;
    if (this.chargeInterval) {
      clearInterval(this.chargeInterval);
    }
  }

  // Simple event emitter pattern
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach((callback) => callback(data));
    }
  }
}
