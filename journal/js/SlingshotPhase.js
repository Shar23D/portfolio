export default class SlingshotPhase {
  constructor(targets) {
    this.targets = targets;
    this.elements = {
      slingshotPhase: document.getElementById("slingshotPhase"),
      paperBall: document.getElementById("paperBall"),
      powerGauge: document.getElementById("powerGauge"),
      targetEmoji: document.getElementById("targetEmoji"),
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
    document.addEventListener("mouseup", () => {
      if (this.isCharging) this.launch();
    });
    document.addEventListener("mouseleave", () => {
      if (this.isCharging) this.launch();
    });
  }

  show() {
    this.elements.slingshotPhase.classList.add("active");
    this.reset();
  }
  hide() {
    this.elements.slingshotPhase.classList.remove("active");
  }

  startCharging() {
    this.isCharging = true;
    this.power = 0;
    this.elements.paperBall.classList.add("charging");
    this.elements.powerText.textContent = "Charging launch...";

    this.chargeInterval = setInterval(() => {
      this.power = Math.min(this.power + 1.5, this.maxPower);
      this.updateTargetDisplay();
    }, 50);
  }

  updateTargetDisplay() {
    const target = this.targets.getTargetForPower(this.power);
    this.elements.targetEmoji.textContent = target.emoji;
    this.elements.powerText.textContent = `Target: ${
      target.name.charAt(0).toUpperCase() + target.name.slice(1)
    } - Power: ${Math.floor(this.power)}%`;
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

    const target = this.targets.getTargetForPower(this.power);
    this.emit("launch", target);
  }

  reset() {
    this.power = 0;
    this.elements.targetEmoji.textContent = "🎯";
    this.elements.powerText.textContent =
      "Hold the paper to charge your launch";
    this.isCharging = false;
    if (this.chargeInterval) clearInterval(this.chargeInterval);
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
