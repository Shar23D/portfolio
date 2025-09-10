export default class StarField {
  constructor() {
    this.starsContainer = document.getElementById("starsContainer");
    this.stars = [];
  }

  create() {
    this.starsContainer.innerHTML = "";
    this.stars = [];

    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      star.style.animationDelay = `${Math.random() * 3}s`;
      this.starsContainer.appendChild(star);
      this.stars.push(star);
    }
  }

  reset() {}
}
