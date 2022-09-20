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
const winnerAlert = document.getElementById("winner-alert");

let winner;
let chooseWinner = () => {
  if(playerScoreElem.textContent > computerScoreElem.textContent){ 
   winner = 'Player'
  } if(playerScoreElem.textContent < computerScoreElem.textContent){
    winner = 'Computer'
} else{
    winner = 'Tied. No one '}
}
let prevTime;
let gameOn = true;
function update(time) {
  if (prevTime != null && gameOn) {
    const delta = time - prevTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLost()) handleLoss();
  } else if( gameOn == false){
    const delta = 0;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        chooseWinner();
        winnerAlert.textContent= `${winner} wins!`;
        
  } 

  prevTime = time;
  window.requestAnimationFrame(update);
}

function isLost() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLoss() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

const reload = () => window.location.reload();

const changeMode = () => {
  console.log('changing mode');
  const initialText = 'Easy';
  if (modeBtn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    modeBtn.innerHTML = '<span style="font-weight: bold">Hard</span>';
    playerPaddle.height -= 10;
  } else {
    modeBtn.innerHTML = '<span style="font-weight: thin">Easy</span>';    playerPaddle.height += 10;
  }
  };

const endGame = () => {
  console.log('ending game') 
  gameOn = false;}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
newBtn.addEventListener("click", reload);
modeBtn.addEventListener("click", changeMode);
quitBtn.addEventListener("click", endGame);
window.requestAnimationFrame(update);
