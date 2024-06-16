import { displayWords } from "./words.js";
import { getStats } from "./stat-logic.js";
import { inputValidation } from "./validation.js";

let timerId;

async function main() {
  await displayWords();
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      runTest();
    }
  });
}

async function runTest() {
  await displayWords();
  newTest();
  timerId = await startTimer(20);
  getStats();
}

async function newTest() {
  document.querySelector(".word").classList.add("current");
  document.querySelector(".letter").classList.add("current");

  document.addEventListener("keydown", (event) => {
    if (event.target === document.body) {
      inputValidation(event);
    }
  });
}

async function startTimer(seconds) {
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
    return interval;
  });
}

main();
