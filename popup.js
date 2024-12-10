let timer = null;
let currentTime = 0;
let maxTime = 0;
const timeDisplay = document.getElementById('tempo');

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function startTimer(minutes) {
  clearInterval(timer);
  currentTime = 0;
  maxTime = minutes * 60;
  updateDisplay();
  timer = setInterval(() => {
    currentTime++;
    updateDisplay();
    if (currentTime === maxTime) {
      clearInterval(timer);
      alert("O tempo acabou!");
      startOvertime();
    }
  }, 1000);
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(currentTime);
  const perc = currentTime / maxTime;
  if (perc >= 0.9) {
    timeDisplay.style.backgroundColor = 'red';
    timeDisplay.style.color = currentTime % 2 === 0 ? 'white' : 'black'; // Piscar
  } else if (perc >= 0.6) {
    timeDisplay.style.backgroundColor = 'orange';
  } else if (perc >= 0.3) {
    timeDisplay.style.backgroundColor = 'yellow';
  } else {
    timeDisplay.style.backgroundColor = 'green';
  }
}

function startOvertime() {
  clearInterval(timer);
  timer = setInterval(() => {
    currentTime++;
    timeDisplay.textContent = formatTime(currentTime - maxTime);
  }, 1000);
}

document.querySelectorAll('[data-minutos]').forEach(button => {
  button.addEventListener('click', () => startTimer(parseInt(button.dataset.minutos)));
});

document.getElementById('pause').addEventListener('click', () => clearInterval(timer));
document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timer);
  currentTime = 0;
  timeDisplay.textContent = '00:00:00';
  timeDisplay.style.backgroundColor = 'green';
});
