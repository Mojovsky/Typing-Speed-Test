import { displayWords } from "./words.js";
import { getStats } from "./stat-logic.js";
import { inputValidation } from "./validation.js";
import { startTimer } from "./timer.js";

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
  await displayWords();
  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      newTest();
      await startTimer(60);
      getStats();
    }
  });
}

runTest();
