export class Targets {
  constructor() {
    this.targets = [
      {
        name: "trash",
        min: 0,
        max: 25,
        html: `<div class="trash-can">🗑️</div>`,
        flightDuration: 1200,
        messages: [
          "Your worries have been discarded into the cosmic waste bin.",
          "Sometimes the simplest disposal is the most effective.",
          "Thrown away among the stars, never to return.",
        ],
      },
      {
        name: "fire",
        min: 25,
        max: 50,
        html: `<div class="fire">
                         <div class="fire-flame"></div>
                         <div class="fire-flame"></div>
                         <div class="fire-flame"></div>
                         <div class="fire-flame"></div>
                         <div class="fire-core"></div>
                         <div class="fire-base"></div>
                       </div>`,
        flightDuration: 2000,
        messages: [
          "Your troubles burn away in cosmic flames.",
          "The fire of the universe consumes your worries completely.",
          "Reduced to stardust and scattered across infinity.",
        ],
      },
      {
        name: "sun",
        min: 50,
        max: 75,
        html: `<div class="sun">
                         <div class="sun-ray"></div>
                         <div class="sun-ray"></div>
                         <div class="sun-ray"></div>
                         <div class="sun-ray"></div>
                         <div class="sun-ray"></div>
                         <div class="sun-ray"></div>
                         <div class="sun-core"></div>
                         <div class="sun-flare"></div>
                         <div class="sun-flare"></div>
                         <div class="sun-flare"></div>
                       </div>`,
        flightDuration: 3000,
        messages: [
          "The sun's nuclear fire vaporizes your concerns instantly.",
          "Your worries become energy, fueling the light of stars.",
          "Transformed into solar wind, carrying your peace across the galaxy.",
        ],
      },
      {
        name: "blackhole",
        min: 75,
        max: 100,
        html: `<div class="blackhole">
                         <div class="blackhole-accretion"></div>
                         <div class="blackhole-accretion"></div>
                         <div class="blackhole-event-horizon"></div>
                         <div class="blackhole-singularity"></div>
                         <div class="blackhole-particle"></div>
                         <div class="blackhole-particle"></div>
                         <div class="blackhole-particle"></div>
                       </div>`,
        flightDuration: 4500,
        messages: [
          "Your deepest fears collapse into the singularity, beyond space and time.",
          "The black hole's infinite gravity crushes your worries out of existence.",
          "Compressed beyond the event horizon where worry cannot exist.",
        ],
      },
    ];
  }

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
