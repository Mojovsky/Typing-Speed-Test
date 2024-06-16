const gameTime = 60 * 1000;

function getWpm() {
  const typedWords = getTypedWords();
  const correctWords = typedWords.filter((word) =>
    word.classList.contains("correct")
  );
  const result = (correctWords.length / typedWords.length) * 60;
  updateElementText("wpm-value", result.toFixed(0));
}

function getWordAccuracy() {
  const typedWords = getTypedWords();
  const correctWords = typedWords.filter((word) =>
    word.classList.contains("correct")
  );
  const result = (correctWords.length / typedWords.length) * 100;
  updateElementText("accuracy-value", result.toFixed(0) + "%");
}

function countIncorrectLetters() {
  const letters = Array.from(document.querySelectorAll(".letter"));
  const count = letters.filter((letter) =>
    letter.classList.contains("incorrect")
  ).length;
  updateElementText("errors-value", count);
}

function getTypedWords() {
  const words = Array.from(document.querySelectorAll(".word"));
  const lastTypedWord = words.find((word) =>
    word.classList.contains("current")
  );
  return words.slice(0, words.indexOf(lastTypedWord) + 1);
}

function updateElementText(elementId, text) {
  document.getElementById(elementId).innerHTML = text;
}

function getStats() {
  getWpm();
  getWordAccuracy();
  countIncorrectLetters();
}

export { getStats };
