export class StarField {
  constructor() {
    this.starsContainer = document.getElementById("starsContainer");
    this.stars = [];
  }

  create() {
    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      this.starsContainer.appendChild(star);
      this.stars.push(star);
    }
  }

  enableFlightMode() {
    this.starsContainer.classList.add("flying");
    this.createStarStreaks();
  }

  disableFlightMode() {
    this.starsContainer.classList.remove("flying");
    this.stars.forEach((star) => {
      star.classList.remove("streak");
    });
  }

  createStarStreaks() {
    this.stars.forEach((star, index) => {
      if (Math.random() < 0.3) {
        star.classList.add("streak");
        star.style.animationDelay = `${Math.random() * 2}s`;
      }
    });
  }
}
