const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;
export default class Ball {
  constructor(ballEl) {
    this.ballEl = ballEl;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballEl).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballEl.style.setProperty("--this.x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballEl).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballEl.style.setProperty("--this.y", value);
  }

  rect() {
    return this.ballEl.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    //velocity and vector calculations
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x >= 0.9)
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }; //unit vector
    }
    this.velocity = INITIAL_VELOCITY;
  }

  
  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const rect = this.rect()

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1
    }

    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}