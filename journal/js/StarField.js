export default class StarField {
  constructor() {
    this.starsContainer = document.getElementById("starsContainer");
    this.stars = [];
    this.running = false;
  }

  create(count = 200) {
    this.starsContainer.innerHTML = "";
    this.stars = [];

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      star.style.animation = `twinkle 3s infinite`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      this.starsContainer.appendChild(star);
      this.stars.push(star);
    }
  }

  startAnimation(duration) {
    this.running = true;

    // Stagger the launches to make it continuous
    this.stars.forEach((star, index) => {
      const delay = Math.random() * 2000;
      setTimeout(() => {
        if (!this.running) return;
        this.launchStar(star);
      }, delay);
    });

    // Set a timer to reset the animation after the given duration
    setTimeout(() => {
      this.reset();
    }, duration);
  }

  launchStar(star) {
    if (!this.running) return;

    const angle = Math.random() * 2 * Math.PI;
    const distance = 600 + Math.random() * 400;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const flightDuration = 1.5 + Math.random(); // seconds

    star.style.animation = "none";
    star.offsetHeight; // Force reflow
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.setProperty('--x', `${x}px`);
    star.style.setProperty('--y', `${y}px`);
    star.style.animation = `hyperdrive ${flightDuration}s linear`;

    // Relaunch after each flight — only if still running
    star.addEventListener('animationend', () => {
      if (!this.running) return;

      const respawnDelay = Math.random() * 1000;
      setTimeout(() => this.launchStar(star), respawnDelay);
    }, { once: true });
  }

  reset() {
    this.running = false;
    this.stars.forEach(star => {
      star.style.animation = "none";
      star.offsetHeight; // reflow to apply reset cleanly

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      star.style.animation = `twinkle 3s infinite`;
      star.style.animationDelay = `${Math.random() * 3}s`;
    });
  }
}
