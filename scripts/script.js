import { displayWords } from "./words.js";
import { getStats } from "./stat-logic.js";
import { inputValidation } from "./validation.js";
import { startTimer } from "./timer.js";

let gameState = false;

async function newTest() {
  await displayWords();

  document.querySelector(".word").classList.add("current");
  document.querySelector(".letter").classList.add("current");

  document.addEventListener("keyup", (event) => {
    if (event.target === document.body) {
      inputValidation(event);
    }
  });
}

async function runTest() {
  gameState = true;
  newTest();
  await startTimer(60);
  getStats();
  gameState = false;
}

async function main() {
  await displayWords();

  document.addEventListener("keydown", handleKeyDown);
}

async function handleKeyDown(event) {
  if (event.key === "Enter") {
    await runTest();

    if (!gameState) {
      displayWords();
    }
  }
}

main();
