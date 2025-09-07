export class Targets {
  constructor() {
    this.targets = [
      {
        name: "trash",
        min: 0,
        max: 20,
        emoji: "🗑️",
        html: `<div class="trash-can">🗑️</div>`,
        flightDuration: 4000,
        messages: [
          "Your worries have been discarded into the cosmic waste bin.",
          "Sometimes the simplest disposal is the most effective.",
          "Thrown away among the stars, never to return.",
        ],
      },
      {
        name: "fire",
        min: 20,
        max: 40,
        emoji: "🔥",
        html: `<div class="fire">🔥</div>`,
        flightDuration: 4500,
        messages: [
          "Your troubles burn away in cosmic flames.",
          "The fire of the universe consumes your worries completely.",
          "Reduced to stardust and scattered across infinity.",
        ],
      },
      {
        name: "tornado",
        min: 40,
        max: 60,
        emoji: "🌪️",
        html: `<div class="tornado">🌪️</div>`,
        flightDuration: 4500,
        messages: [
          "Your worries are swept away in a cosmic whirlwind.",
          "The tornado carries your troubles to distant galaxies.",
          "Scattered by stellar winds, never to reform.",
        ],
      },
      {
        name: "sun",
        min: 60,
        max: 80,
        emoji: "☀️",
        html: `<div class="sun">
                       <div class="sun-ray"></div>
                       <div class="sun-ray"></div>
                       <div class="sun-ray"></div>
                       <div class="sun-ray"></div>
                       <div class="sun-ray"></div>
                       <div class="sun-ray"></div>
                       <div class="sun-core"></div>
                     </div>`,
        flightDuration: 5000,
        messages: [
          "The sun's nuclear fire vaporizes your concerns instantly.",
          "Your worries become energy, fueling the light of stars.",
          "Transformed into solar wind, carrying your peace across the galaxy.",
        ],
      },
      {
        name: "blackhole",
        min: 80,
        max: 100,
        emoji: "🕳️",
        html: `<div class="blackhole">
                       <div class="blackhole-accretion"></div>
                       <div class="blackhole-accretion"></div>
                       <div class="blackhole-event-horizon"></div>
                       <div class="blackhole-singularity"></div>
                     </div>`,
        flightDuration: 6000,
        messages: [
          "Your deepest fears collapse into the singularity, beyond space and time.",
          "The black hole's infinite gravity crushes your worries out of existence.",
          "Compressed beyond the event horizon where worry cannot exist.",
        ],
      },
    ];
  }

  /* Target resizing - bigger as ball "flies" closer*/
  getTargetForPower(power) {
    return (
      this.targets.find(
        (t) =>
          power >= t.min &&
          (power < t.max || t === this.targets[this.targets.length - 1])
      ) || this.targets[0]
    );
  }

  getAllTargets() {
    return this.targets;
  }
}
