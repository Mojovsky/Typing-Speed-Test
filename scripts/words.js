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

async function displayWords() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let word = await getRandomWord();
    document.getElementById("words").innerHTML += formatWord(word);
  }
}

export { getRandomWord, formatWord, displayWords };
