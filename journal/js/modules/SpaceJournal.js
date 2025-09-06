import { StarField } from "./StarField.js";
import { GamePhase } from "./GamePhase.js";
import { FlightPhase } from "./FlightPhase.js";
import { Targets } from "./Targets.js";

export class SpaceJournal {
  constructor() {
    this.elements = {
      journalText: document.getElementById("journalText"),
      crumpleButton: document.getElementById("crumpleButton"),
      journalContainer: document.getElementById("journalContainer"),
      gameContainer: document.getElementById("gameContainer"),
      flightView: document.getElementById("flightView"),
      completionMessage: document.getElementById("completionMessage"),
      messageText: document.getElementById("messageText"),
      restartButton: document.getElementById("restartButton"),
    };

    this.modules = {
      starField: new StarField(),
      gamePhase: new GamePhase(),
      flightPhase: new FlightPhase(),
      targets: new Targets(),
    };

    this.init();
  }

  init() {
    this.modules.starField.create();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.elements.journalText.addEventListener("input", () => {
      this.updateCrumpleButton();
    });

    this.elements.crumpleButton.addEventListener("click", () => {
      this.transitionToGame();
    });

    this.elements.restartButton.addEventListener("click", () => {
      this.restart();
    });

    // Game phase events
    this.modules.gamePhase.on("launch", (power) => {
      const target = this.modules.targets.getTargetForPower(power);
      this.startSpaceFlight(target);
    });
  }

  updateCrumpleButton() {
    const hasText = this.elements.journalText.value.trim().length > 0;
    this.elements.crumpleButton.disabled = !hasText;
    this.elements.crumpleButton.textContent = hasText
      ? "Crumple Paper & Launch Into Space"
      : "Write something first...";
  }

  transitionToGame() {
    const paper = document.querySelector(".paper");
    paper.style.animation = "paperDisintegrate 1s ease-in";

    setTimeout(() => {
      this.elements.journalContainer.style.display = "none";
      this.elements.gameContainer.classList.add("active");
      this.modules.gamePhase.activate();
    }, 1000);
  }

  startSpaceFlight(target) {
    this.elements.gameContainer.classList.remove("active");
    this.elements.flightView.classList.add("active");

    this.modules.starField.enableFlightMode();
    this.modules.flightPhase.start(target, () => {
      this.showCompletionMessage(target);
    });
  }

  showCompletionMessage(target) {
    const randomMessage =
      target.messages[Math.floor(Math.random() * target.messages.length)];
    this.elements.messageText.innerHTML = randomMessage;

    setTimeout(() => {
      this.elements.completionMessage.style.display = "block";
    }, 2000);
  }

  restart() {
    this.elements.completionMessage.style.display = "none";
    this.elements.flightView.classList.remove("active");
    this.elements.gameContainer.classList.remove("active");
    this.elements.journalContainer.style.display = "flex";

    this.modules.starField.disableFlightMode();
    this.modules.gamePhase.reset();
    this.modules.flightPhase.reset();

    this.elements.journalText.value = "";
    this.updateCrumpleButton();

    const paper = document.querySelector(".paper");
    paper.style.animation = "";
    paper.style.opacity = "1";
    paper.style.transform = "none";
  }
}
