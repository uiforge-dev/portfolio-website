// DOM elements
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// State
let startTime = 0;
let elapsedTime = 0;
let running = false;
let interval = null;
let lapCounter = 1;

// Format time: HH:MM:SS.mm
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return { hours, minutes, seconds, milliseconds };
}

// Update display
function updateDisplay() {
    const time = formatTime(elapsedTime);
    hoursEl.textContent = time.hours;
    minutesEl.textContent = time.minutes;
    secondsEl.textContent = time.seconds;
    millisecondsEl.textContent = time.milliseconds;
}

// Main timer loop
function tick() {
    const now = Date.now();
    elapsedTime = now - startTime;
    updateDisplay();
}

// Start
function start() {
    if (running) return;

    if (elapsedTime === 0) {
        // Fresh start
        startTime = Date.now();
    } else {
        // Resume from pause
        startTime = Date.now() - elapsedTime;
    }

    running = true;
    interval = setInterval(tick, 10); // update every 10ms

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

// Pause
function pause() {
    if (!running) return;
    clearInterval(interval);
    running = false;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset
function reset() {
    clearInterval(interval);
    running = false;
    elapsedTime = 0;
    lapCounter = 1;
    lapList.innerHTML = '<li class="empty-laps">No laps recorded</li>';

    updateDisplay();

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

// Lap
function lap() {
    if (!running) return;

    const lapTime = formatTime(elapsedTime);
    const lapString = `${lapTime.hours}:${lapTime.minutes}:${lapTime.seconds}.${lapTime.milliseconds}`;

    // Remove empty placeholder if present
    if (lapList.querySelector('.empty-laps')) {
        lapList.innerHTML = '';
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="lap-number">Lap ${lapCounter}</span>
        <span class="lap-time">${lapString}</span>
    `;
    lapList.prepend(li); // newest lap on top
    lapCounter++;
}

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 's') {
        e.preventDefault();
        if (running) pause();
        else start();
    }
    if (e.key === 'r' || e.key === 'R') reset();
    if (e.key === 'l' || e.key === 'L') lap();
});

// Initial state
reset();