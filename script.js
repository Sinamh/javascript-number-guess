'use strict';

const messageBoard = document.querySelector('.message');
const scoreBoard = document.querySelector('.score');
const highscoreBoard = document.querySelector('.highscore');
const numBoard = document.querySelector('.number');

const bodyEl = document.querySelector('body');

const checkbtn = document.querySelector('.check');
const againbtn = document.querySelector('.again');

const guessinput = document.querySelector('.guess');

const upperrange = document.querySelector('.upperrange');

const gameGlobals = {
  initialScore: 20,
  randomNumber: 0,
  numinput: 0,
  score: 0,
  highscore: 0,
  gameEnd: false,
  prevInput: 0,
  message: {
    startMode: 'Start guessing...',
    highMode: '📉 Too high!',
    lowMode: '📈 Too low!',
    winMode: '✔ Correct Number!',
    loseMode: '❌ Try Again!',
  },
};

const setUpGame = function () {
  upperrange.textContent = gameGlobals.initialScore;
  gameGlobals.score = gameGlobals.initialScore;
  gameGlobals.gameEnd = false;
  gameGlobals.randomNumber = Math.trunc(
    Math.random() * gameGlobals.initialScore + 1
  );
  console.log(gameGlobals.randomNumber);
  messageBoard.textContent = gameGlobals.message.startMode;
  numBoard.textContent = '?';
  guessinput.value = null;
  numBoard.style.width = '15rem';
  bodyEl.style.backgroundColor = '#222';
  scoreBoard.textContent = gameGlobals.score;
};
setUpGame();

const isInRange = function (inputnum) {
  if (inputnum >= 1 && inputnum <= gameGlobals.initialScore) {
    return true;
  }
  return false;
};

const checkHandler = function () {
  guessinput.focus();
  if (!isInRange(Number(guessinput.value)) && guessinput.value !== '') {
    messageBoard.textContent = `Not in Range !1-${gameGlobals.initialScore}¡`;
    guessinput.value = '';
    return;
  }
  if (
    !gameGlobals.gameEnd &&
    guessinput.value !== '' &&
    Number(guessinput.value) !== gameGlobals.prevInput
  ) {
    gameGlobals.numinput = Number(guessinput.value);
    gameGlobals.prevInput = Number(guessinput.value);
    guessinput.value = '';
    if (gameGlobals.numinput > gameGlobals.randomNumber) {
      messageBoard.textContent = gameGlobals.message.highMode;
      gameGlobals.score--;
      scoreBoard.textContent = gameGlobals.score;
    } else if (gameGlobals.numinput < gameGlobals.randomNumber) {
      messageBoard.textContent = gameGlobals.message.lowMode;
      gameGlobals.score--;
      scoreBoard.textContent = gameGlobals.score;
    } else {
      gameGlobals.gameEnd = true;
      if (gameGlobals.score > gameGlobals.highscore) {
        gameGlobals.highscore = gameGlobals.score;
        highscoreBoard.textContent = gameGlobals.highscore;
      }
      numBoard.textContent = gameGlobals.randomNumber;
      numBoard.style.width = '30rem';
      bodyEl.style.backgroundColor = '#2ecc71';
      messageBoard.textContent = gameGlobals.message.winMode;
    }
    if (gameGlobals.score === 0) {
      gameGlobals.gameEnd = true;
      numBoard.textContent = 'X';
      bodyEl.style.backgroundColor = '#e74c3c';
      messageBoard.textContent = gameGlobals.message.loseMode;
    }
  }
};

againbtn.addEventListener('click', setUpGame);

checkbtn.addEventListener('click', checkHandler);

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    checkHandler();
  }
});

guessinput.addEventListener('click', () => {
  if (!gameGlobals.gameEnd) {
    guessinput.value = null;
  }
});
