import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const newBtn = document.getElementById("new-button");
const modeBtn = document.getElementById("mode-button");
const quitBtn = document.getElementById("quit-button");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

const reload = () => {};

const changeMode = () => {
  console.log("changemode");
  let isEasy;
  switch (modeBtn.innerHTML) {
    case "Hard":
      modeBtn.innerHTML = "Easy";
      isEasy = true;
      console.log("easy");
      break;
    case "Easy":
        modeBtn.innerHTML = "Hard";
        isEasy = false;
        console.log("easy");
        break;
    default:
      break;
  }

  isEasy ? (playerPaddle.height += 10) : (playerPaddle.height -= 10);
};
const quit = () => {};

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
newBtn.addEventListener("click", reload());
modeBtn.addEventListener("click", changeMode());
quitBtn.addEventListener("click", quit());
window.requestAnimationFrame(update);
