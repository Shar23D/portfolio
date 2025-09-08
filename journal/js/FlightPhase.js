export default class FlightPhase {
  constructor() {
    this.elements = {
      flightPhase: document.getElementById("flightPhase"),
      flyingPaper: document.getElementById("flyingPaper"),
      target: document.getElementById("target"),
    };
    this.eventListeners = {};
  }

  start(target) {
    this.elements.flightPhase.classList.add("active");
    this.elements.target.innerHTML = target.html;

    setTimeout(() => {
      this.elements.target.style.animation = `targetApproach ${target.flightDuration}ms ease-out forwards`;
      this.elements.target.classList.add("visible");
      this.elements.flyingPaper.style.animation = `paperFlight ${target.flightDuration}ms linear`;

      setTimeout(() => {
        this.elements.flyingPaper.style.display = "none";
        this.createExplosion(target);
        this.emit("complete", target);
      }, target.flightDuration);
    }, 500);
  }

  createExplosion(target) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "6px";
      particle.style.height = "6px";
      particle.style.background = this.getParticleColor(target.name);
      particle.style.borderRadius = "50%";
      particle.style.left = "50%";
      particle.style.top = "50%";
      particle.style.transform = "translate(-50%, -50%)";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "15";
      this.elements.target.appendChild(particle);

      setTimeout(() => {
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 150 + Math.random() * 100;
        particle.style.transition = "all 2s ease-out";
        particle.style.transform = `translate(${
          Math.cos(angle) * distance
        }px, ${Math.sin(angle) * distance}px) scale(0)`;
        particle.style.opacity = "0";

        setTimeout(() => {
          if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, 2000);
      }, 100);
    }
  }

  getParticleColor(targetName) {
    const colors = {
      trash: "#888",
      fire: "#FF4500",
      tornado: "#87CEEB",
      sun: "#FFD700",
      blackhole: "#8A2BE2",
    };
    return colors[targetName] || "#fff";
  }

  reset() {
    this.elements.flightPhase.classList.remove("active");
    this.elements.flyingPaper.style.display = "block";
    this.elements.flyingPaper.style.animation = "";
    this.elements.flyingPaper.style.transition = "";
    this.elements.target.classList.remove("visible");
    this.elements.target.style.animation = "";
    this.elements.target.innerHTML = "";
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
