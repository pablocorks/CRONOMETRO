let timer = null;
let timeRemaining = 0;
let isRunning = false;

const display = document.getElementById("timer-display");
const btn15 = document.getElementById("btn-15");
const btn30 = document.getElementById("btn-30");
const btn45 = document.getElementById("btn-45");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");

const updateDisplay = () => {
  const hours = String(Math.floor(timeRemaining / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeRemaining % 60).padStart(2, "0");
  display.textContent = `${hours}:${minutes}:${seconds}`;
};

const changeColor = () => {
  if (timeRemaining <= 0) {
    display.style.backgroundColor = "red";
    display.style.color = "white";
  } else if (timeRemaining <= 60) {
    display.style.backgroundColor = "orange";
  } else if (timeRemaining <= 120) {
    display.style.backgroundColor = "yellow";
  } else {
    display.style.backgroundColor = "green";
  }
};

const startTimer = (seconds) => {
  clearInterval(timer);
  timeRemaining = seconds;
  isRunning = true;
  updateDisplay();
  changeColor();

  timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateDisplay();
      changeColor();
    } else {
      clearInterval(timer);
      display.textContent = "O TEMPO ACABOU!";
      isRunning = false;
    }
  }, 1000);
};

btn15.addEventListener("click", () => startTimer(15 * 60));
btn30.addEventListener("click", () => startTimer(30 * 60));
btn45.addEventListener("click", () => startTimer(45 * 60));
btnPause.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  } else {
    startTimer(timeRemaining);
  }
});
btnReset.addEventListener("click", () => {
  clearInterval(timer);
  timeRemaining = 0;
  updateDisplay();
  display.style.backgroundColor = "white";
});
