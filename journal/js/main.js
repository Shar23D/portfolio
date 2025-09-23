import StarField from "./StarField.js";
import Targets from "./Targets.js";
import JournalPhase from "./JournalPhase.js";
import SlingshotPhase from "./SlingshotPhase.js";
import FlightPhase from "./FlightPhase.js";
import CompletionMessage from "./CompletionMessage.js";

class SpaceJournal {
  constructor() {
    this.starField = new StarField();
    this.targets = new Targets();
    this.journalPhase = new JournalPhase();
    this.slingshotPhase = new SlingshotPhase(this.targets);
    this.flightPhase = new FlightPhase(this.starField);
    this.completionMessage = new CompletionMessage();

    this.init();
  }

  init() {
    this.starField.create();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.journalPhase.on("crumple", () => this.transitionToSlingshot());
    this.slingshotPhase.on("launch", (target) => this.startFlight(target));
    this.flightPhase.on("complete", (target) =>
      this.completionMessage.show(target)
    );
    this.completionMessage.on("restart", () => this.restart());
  }

  async transitionToSlingshot() {
    await this.journalPhase.transitionOut();
    this.slingshotPhase.show();
  }

  startFlight(target) {
    this.slingshotPhase.hide();
    this.flightPhase.start(target);
  }

  restart() {
    this.completionMessage.hide();
    this.starField.reset();
    this.flightPhase.reset();
    this.slingshotPhase.reset();
    this.journalPhase.reset();
  }
}

document.addEventListener("DOMContentLoaded", () => new SpaceJournal());
