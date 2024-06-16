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

export { startTimer };
