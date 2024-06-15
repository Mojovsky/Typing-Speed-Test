import { getRandomWord, formatWord, addClass } from "./words.js";
import { getWpm, getWordAccuracy } from "./stat-logic.js";
import { handleKeyUp } from "./key.js";

async function newTest() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let word = await getRandomWord();
    document.getElementById("words").innerHTML += formatWord(word);
  }

  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");

  document.addEventListener("keyup", (event) => {
    if (event.target === document.body) {
      handleKeyUp(event);
    }
  });
}

newTest();
