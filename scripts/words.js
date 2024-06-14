function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

async function fetchWords() {
  const response = await fetch("./words-list.json");
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

export { getRandomWord, addClass, removeClass };
