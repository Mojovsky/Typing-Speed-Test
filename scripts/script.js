import { getRandomWord, formatWord, addClass, displayWords } from "./words.js";
import { getWpm, getWordAccuracy } from "./stat-logic.js";
import { handleKeyUp } from "./key.js";
import { startTimer } from "./timer.js";

async function newTest() {
  await displayWords();

  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");

  document.addEventListener("keyup", (event) => {
    if (event.target === document.body) {
      handleKeyUp(event);
    }
  });
}

async function runTest() {
  await displayWords();
  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      newTest();
      startTimer(60);
    }
  });
}

runTest();
