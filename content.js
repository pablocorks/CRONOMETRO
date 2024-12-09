// Cria o contêiner do cronômetro
const cronometroContainer = document.createElement("div");
cronometroContainer.id = "cronometro-container";
cronometroContainer.innerHTML = `
  <div id="timer-display">00:00:00</div>
  <div id="controls">
    <button id="btn-15">15</button>
    <button id="btn-30">30</button>
    <button id="btn-45">45</button>
    <button id="btn-pause">||</button>
    <button id="btn-reset">X</button>
  </div>
`;

// Adiciona o estilo básico para o contêiner
document.body.appendChild(cronometroContainer);

// Lógica do cronômetro
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
  const minutes =
