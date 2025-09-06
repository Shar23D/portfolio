export class FlightPhase {
  constructor() {
    this.elements = {
      flightView: document.getElementById("flightView"),
      spaceParticles: document.getElementById("spaceParticles"),
      flyingPaper: document.getElementById("flyingPaper"),
      target: document.getElementById("target"),
    };
  }

  start(target, onComplete) {
    this.createSpaceParticles();
    this.elements.target.innerHTML = target.html;

    setTimeout(() => {
      this.elements.target.classList.add("visible");
      this.animateToTarget(target, onComplete);
    }, 500);
  }

  createSpaceParticles() {
    this.elements.spaceParticles.innerHTML = "";

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "space-particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      this.elements.spaceParticles.appendChild(particle);

      setTimeout(() => {
        particle.style.transition = "transform 3s linear";
        particle.style.transform = `translateX(${
          (Math.random() - 0.5) * 200
        }px) translateY(${(Math.random() - 0.5) * 200}px)`;
        particle.style.opacity = "0";
      }, i * 20);
    }
  }

  animateToTarget(target, onComplete) {
    const duration = target.flightDuration;

    setTimeout(() => {
      this.elements.flyingPaper.style.transition = `all ${duration}ms ease-in`;
      this.elements.flyingPaper.style.transform =
        "translate(-50%, -50%) scale(0.3)";
    }, 500);

    setTimeout(() => {
      this.elements.flyingPaper.style.display = "none";
      this.createDestructionEffect(target);
      onComplete();
    }, duration + 500);
  }

  createDestructionEffect(target) {
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

      this.elements.target.appendChild(particle);

      setTimeout(() => {
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 150 + Math.random() * 100;
        particle.style.transition = "all 2s ease-out";
        particle.style.transform = `translate(${
          Math.cos(angle) * distance
        }px, ${Math.sin(angle) * distance}px) scale(0)`;
        particle.style.opacity = "0";
      }, 100);
    }
  }

  getParticleColor(targetName) {
    const colors = {
      trash: "#888",
      fire: "#FF4500",
      sun: "#FFD700",
      blackhole: "#8A2BE2",
    };
    return colors[targetName] || "#fff";
  }

  reset() {
    this.elements.flyingPaper.style.display = "block";
    this.elements.flyingPaper.style.transition = "";
    this.elements.flyingPaper.style.transform = "translate(-50%, -50%)";

    this.elements.target.classList.remove("visible");
    this.elements.target.innerHTML = "";
    this.elements.spaceParticles.innerHTML = "";
  }
}
