import { displayWords } from "./words.js";
import { getStats } from "./stat-logic.js";
import { inputValidation } from "./validation.js";

let timerId;
let isRunning = false;

async function main() {
  await displayWords();
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
  if (event.key === "Enter" && !isRunning) {
    runTest();
  } else if (event.key === "Escape" && isRunning) {
    runTest();
  } else {
    if (event.target === document.body) {
      inputValidation(event);
    }
  }
}

async function runTest() {
  if (isRunning) {
    clearInterval(timerId); // Clear existing timer
  }

  isRunning = true;
  await displayWords();
  newTest();
  timerId = await startTimer(60);
  getStats();
}

function newTest() {
  document.querySelector(".word").classList.add("current");
  document.querySelector(".letter").classList.add("current");
}

async function startTimer(seconds) {
  return new Promise((resolve) => {
    let timer = seconds;
    timerId = setInterval(() => {
      timer--;
      document.getElementById("timer").innerHTML = `<span>${timer}s</span>`;
      if (timer <= 0) {
        clearInterval(timerId);
        isRunning = false; // Reset the flag when the timer ends
        resolve();
      }
    }, 1000);
  });
}

main();
