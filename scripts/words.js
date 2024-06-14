function addClass(element, className) {
  element.className += " " + className;
}

function removeClass(element, className) {
  element.className = element.className.replace(className, "");
}

function formatWord(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</span></div>`;
}

async function fetchWords() {
  const response = await fetch("scripts/words-list.json");
  return response.json();
}

async function getRandomWord() {
  try {
    const words = await fetchWords();
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  } catch (error) {
    console.error("Error fetching words:", error);
    throw error;
  }
}

async function checkGetRandomWordType() {
  try {
    const word = await getRandomWord();
    console.log(word);
  } catch (error) {
    console.error("Error checking type:", error);
  }
}

checkGetRandomWordType();

export { getRandomWord, addClass, removeClass, formatWord };
