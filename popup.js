let timer;
let totalTime = 0;
let isPaused = false;

// Elementos HTML
const tempoDisplay = document.getElementById('tempo');
const buttons = document.querySelectorAll('button');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

// Atualiza a exibição do cronômetro
function updateDisplay(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  tempoDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

// Controla a contagem do tempo
function startTimer(duration) {
  clearInterval(timer);
  totalTime = duration;
  isPaused = false;
  updateDisplay(totalTime);

  timer = setInterval(() => {
    if (!isPaused) {
      if (totalTime > 0) {
        totalTime--;
        updateDisplay(totalTime);
        updateColor(totalTime, duration);
      } else {
        clearInterval(timer);
        tempoDisplay.style.backgroundColor = 'red';
        tempoDisplay.textContent = 'O TEMPO ACABOU';
      }
    }
  }, 1000);
}

// Atualiza a cor do fundo
function updateColor(current, initial) {
  const greenTime = Math.floor(initial * 0.3);
  const yellowTime = Math.floor(initial * 0.6);
  const orangeTime = Math.floor(initial * 0.9);

  if (current <= greenTime) {
    tempoDisplay.style.backgroundColor = 'red';
  } else if (current <= yellowTime) {
    tempoDisplay.style.backgroundColor = 'orange';
  } else if (current <= orangeTime) {
    tempoDisplay.style.backgroundColor = 'yellow';
  } else {
    tempoDisplay.style.backgroundColor = 'green';
  }
}

// Pausar o cronômetro
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? '▶️' : '||';
});

// Zerar o cronômetro
resetButton.addEventListener('click', () => {
  clearInterval(timer);
  totalTime = 0;
  isPaused = false;
  updateDisplay(0);
  tempoDisplay.style.backgroundColor = 'green';
});

// Botões de tempo
buttons.forEach((button) => {
  const minutes = button.getAttribute('data-minutos');
  if (minutes) {
    button.addEventListener('click', () => startTimer(minutes * 60));
  }
});
