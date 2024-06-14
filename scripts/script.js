import { getRandomWord, addClass, removeClass } from "./words.js";

async function runGame() {
  const wordsElement = document.getElementById("words");
  const words = await Promise.all(Array.from({ length: 200 }, getRandomWord));
  wordsElement.innerHTML = words.join(" ");
}

console.log(runGame());
