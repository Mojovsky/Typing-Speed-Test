function startTimer(seconds) {
  return new Promise((resolve) => {
    let timer = seconds;
    const interval = setInterval(() => {
      timer--;
      document.getElementById("timer").innerHTML = `<span>${timer}s</span>`;
      if (timer <= 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

function resetTimer() {
  const timerElement = document.getElementById("timer");
  const currentTimer = parseInt(timerElement.innerHTML.split("s")[0]);
  if (!isNaN(currentTimer)) {
    startTimer(currentTimer);
  }
}

export { startTimer, resetTimer };
