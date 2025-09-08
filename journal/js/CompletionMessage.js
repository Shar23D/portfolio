export default class CompletionMessage {
  constructor() {
    this.elements = {
      completionMessage: document.getElementById("completionMessage"),
      messageText: document.getElementById("messageText"),
      restartButton: document.getElementById("restartButton"),
    };
    this.eventListeners = {};
    this.elements.restartButton.addEventListener("click", () =>
      this.emit("restart")
    );
  }

  show(target) {
    const randomMessage =
      target.messages[Math.floor(Math.random() * target.messages.length)];
    this.elements.messageText.innerHTML = randomMessage;
    setTimeout(
      () => (this.elements.completionMessage.style.display = "block"),
      2000
    );
  }

  hide() {
    this.elements.completionMessage.style.display = "none";
  }

  on(event, callback) {
    this.eventListeners[event] = this.eventListeners[event] || [];
    this.eventListeners[event].push(callback);
  }
  emit(event, data) {
    if (this.eventListeners[event])
      this.eventListeners[event].forEach((cb) => cb(data));
  }
}
