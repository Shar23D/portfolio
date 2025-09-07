export class FlightPhase {
  constructor() {
    this.elements = {
      flightView: document.getElementById("flightView"),
      spaceParticles: document.getElementById("spaceParticles"),
      flyingPaper: document.getElementById("flyingPaper"),
      target: document.getElementById("target"),
    };
  }

  start(target, onComplete, starField) {
    console.log("Starting flight phase"); // Debug log
    this.starField = starField;
    this.createSpaceParticles();
    this.elements.target.innerHTML = target.html;

    // Apply target scaling animation with duration matching flight time
    setTimeout(() => {
      this.elements.target.style.animation = `targetApproach ${target.flightDuration}ms ease-out forwards`;
      this.elements.target.classList.add("visible");

      // Start paper flight animation
      this.elements.flyingPaper.style.animation = `paperFlight ${target.flightDuration}ms linear`;

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
    console.log(`Flight duration: ${duration}ms`); // Debug log

    // Start paper movement
    setTimeout(() => {
      this.elements.flyingPaper.style.transition = `all ${duration}ms ease-in`;
      this.elements.flyingPaper.style.transform = "translate(-50%, -50%)";
    }, 500);

    // Schedule star transition back to static at 50% of flight duration (earlier)
    if (this.starField) {
      const returnDelay = duration * 0.5;
      console.log(`Scheduling star return in ${returnDelay}ms`); // Debug log
      this.starField.scheduleReturnToStatic(returnDelay);
    }

    // Handle paper collision and destruction
    setTimeout(() => {
      console.log("Paper reached target"); // Debug log
      this.elements.flyingPaper.style.display = "none";
      this.createDestructionEffect(target);

      // Ensure stars are back to normal when flight completes
      if (this.starField && this.starField.isFlightMode) {
        console.log("Force transitioning stars back to static"); // Debug log
        this.starField.disableFlightMode();
      }

      // Complete the flight phase
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

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 2000);
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
    console.log("Resetting flight phase"); // Debug log

    // Reset flying paper
    this.elements.flyingPaper.style.display = "block";
    this.elements.flyingPaper.style.animation = "";
    this.elements.flyingPaper.style.transition = "";
    this.elements.flyingPaper.style.transform = "translate(-50%, -50%)";

    // Reset target
    this.elements.target.classList.remove("visible");
    this.elements.target.style.animation = "";
    this.elements.target.innerHTML = "";

    // Clear space particles
    this.elements.spaceParticles.innerHTML = "";

    // Clean up any remaining particles or fragments
    const particles = this.elements.target.querySelectorAll(
      'div[style*="position: absolute"]'
    );
    particles.forEach((particle) => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
  }
}
