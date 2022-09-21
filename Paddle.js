const SPEED = 0.02;

export default class Paddle {
  constructor(paddleEl) {
    this.paddleEl = paddleEl;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleEl).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleEl.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleEl.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
