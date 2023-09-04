let startTime;
let running = false;
let interval;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.innerText = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    return date.toISOString().substr(11, 8);
}

startStopButton.addEventListener("click", function () {
    if (running) {
        clearInterval(interval);
        startStopButton.innerText = "Start";
        lapButton.disabled = true;
    } else {
        startTime = Date.now() - (interval || 0);
        interval = setInterval(updateTime, 10);
        startStopButton.innerText = "Stop";
        lapButton.disabled = false;
    }
    running = !running;
});

resetButton.addEventListener("click", function () {
    clearInterval(interval);
    display.innerText = "00:00:00";
    startStopButton.innerText = "Start";
    lapButton.disabled = true;
    running = false;
    lapsList.innerHTML = "";
});

lapButton.addEventListener("click", function () {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement("li");
        lapItem.innerText = lapTime;
        lapsList.appendChild(lapItem);
    }
});
