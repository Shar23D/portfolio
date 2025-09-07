export class StarField {
  constructor() {
    this.starsContainer = document.getElementById("starsContainer");
    this.stars = [];
    this.isFlightMode = false;
    this.transitionTimeout = null;
  }

  create() {
    // Clear any existing stars
    this.starsContainer.innerHTML = "";
    this.stars = [];

    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Store original opacity for later restoration
      const originalOpacity = Math.random() * 0.8 + 0.2;
      star.dataset.originalOpacity = originalOpacity;
      star.style.opacity = originalOpacity;

      // Set initial twinkle animation
      star.style.animation = "twinkle 3s infinite";
      star.style.animationDelay = `${Math.random() * 3}s`;

      this.starsContainer.appendChild(star);
      this.stars.push(star);
    }
  }

  enableFlightMode() {
    if (this.isFlightMode) return;

    this.isFlightMode = true;
    this.starsContainer.classList.add("flying");

    // Clear any pending transitions
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }

    // Transition stars to streak mode with staggered timing
    this.stars.forEach((star, index) => {
      // Remove existing animations first
      star.style.animation = "none";
      star.classList.remove(
        "streak-horizontal",
        "streak-vertical",
        "streak-diagonal"
      );

      setTimeout(() => {
        // Randomly assign streak directions for variety
        const streakTypes = [
          "streak-horizontal",
          "streak-vertical",
          "streak-diagonal",
        ];
        const randomStreak =
          streakTypes[Math.floor(Math.random() * streakTypes.length)];

        // Only apply streak to a portion of stars for better effect
        if (Math.random() < 0.7) {
          star.classList.add(randomStreak);
        }

        // Set appropriate animation delay
        star.style.animationDelay = `${Math.random() * 0.5}s`;
      }, index * 2); // Stagger the transition start
    });
  }

  disableFlightMode() {
    this.isFlightMode = false;
    this.starsContainer.classList.remove("flying");

    // Clear any pending transitions
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }

    this.transitionToStatic();
  }

  transitionToStatic() {
    // Smoothly transition stars back to normal state
    this.stars.forEach((star, index) => {
      setTimeout(() => {
        // Remove streak classes and animations
        star.classList.remove(
          "streak-horizontal",
          "streak-vertical",
          "streak-diagonal"
        );
        star.style.animation = "none";

        // Add transition for smooth change back to normal
        star.style.transition = "all 0.8s ease-out";
        star.style.transform = "scale(1)";
        star.style.borderRadius = "50%";
        star.style.opacity = star.dataset.originalOpacity || "0.8";

        // Restore twinkle animation after transition
        setTimeout(() => {
          star.style.transition = "";
          star.style.animation = "twinkle 3s infinite";
          star.style.animationDelay = `${Math.random() * 3}s`;
        }, 800); // Match transition duration
      }, index * 4); // Stagger the return transition
    });
  }

  // Method to handle the transition timing during flight
  scheduleReturnToStatic(delay) {
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }

    this.transitionTimeout = setTimeout(() => {
      if (this.isFlightMode) {
        this.transitionToStatic();
      }
    }, delay);
  }

  // Reset method for cleanup
  reset() {
    this.isFlightMode = false;
    this.starsContainer.classList.remove("flying");

    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = null;
    }

    this.stars.forEach((star) => {
      star.classList.remove(
        "streak-horizontal",
        "streak-vertical",
        "streak-diagonal"
      );
      star.style.animation = "twinkle 3s infinite";
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.transition = "";
      star.style.transform = "";
      star.style.borderRadius = "50%";
      star.style.opacity = star.dataset.originalOpacity || "0.8";
    });
  }
}
