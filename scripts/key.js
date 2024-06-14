import { addClass, removeClass } from "./words.js";

function handleKeyUp(event) {
  const key = event.key;
  const currentWord = document.querySelector(".word.current");
  const currentLetter = document.querySelector(".letter.current");
  const expected = currentLetter?.innerHTML || " ";
  const isLetter = key.length === 1 && key !== " ";
  const isSpace = key === " ";
  const isBackspace = key === "Backspace";
  const isFirstLetter = currentLetter === currentWord.firstChild;

  if (isLetter) {
    updateCurrentLetterValue(key, expected);
  }

  if (isSpace) {
    handleSpaceKeyPress(expected);
  }

  if (isBackspace) {
    handleBackspaceKeyPress(currentLetter, isFirstLetter);
  }

  if (currentWord.getBoundingClientRect().top > 250) {
    updateMarginTopOfWords();
  }

  moveCursorToCurrentLetter();

  function updateCurrentLetterValue(key, expected) {
    if (currentLetter) {
      updateLetterClassBasedOnCorrectness(currentLetter, key === expected);
      moveToNextLetter();
    } else {
      const incorrectLetter = createIncorrectLetterElement(key);
      currentWord.appendChild(incorrectLetter);
    }
  }

  function updateLetterClassBasedOnCorrectness(letter, isCorrect) {
    addClass(letter, isCorrect ? "correct" : "incorrect");
    removeClass(letter, "current");
    if (letter.nextSibling) {
      addClass(letter.nextSibling, "current");
    }
  }

  function moveToNextLetter() {
    removeClass(currentLetter, "current");
    if (currentLetter.nextSibling) {
      addClass(currentLetter.nextSibling, "current");
    }
  }

  function createIncorrectLetterElement(key) {
    const incorrectLetter = document.createElement("span");
    incorrectLetter.innerHTML = key;
    incorrectLetter.className = "incorrect";
    return incorrectLetter;
  }

  function handleSpaceKeyPress(expected) {
    if (expected !== " ") {
      addClass(currentLetter, "incorrect");
      moveToNextLetter();
    }
    removeClass(currentWord, "current");
    moveToNextWord();
  }

  function invalidateIncorrectLetters() {
    const lettersToInvalidate = [
      ...document.querySelectorAll(".word.current .letter:not(.correct)"),
    ];
    lettersToInvalidate.forEach((letter) => {
      addClass(letter, "incorrect");
    });
  }

  function moveToNextWord() {
    if (currentLetter) {
      removeClass(currentLetter, "current");
    }
    addClass(currentWord.nextSibling, "current");
    addClass(currentWord.nextSibling.firstChild, "current");
  }

  function handleBackspaceKeyPress(currentLetter, isFirstLetter) {
    if (currentLetter && isFirstLetter) {
      moveToPreviousWord();
    }
    if (currentLetter && !isFirstLetter) {
      moveBackToPreviousLetter();
    }
    if (!currentLetter) {
      moveToLastLetter();
    }
  }

  function moveToPreviousWord() {
    removeClass(currentWord, "current");
    addClass(currentWord.previousSibling, "current");
    removeClass(currentLetter, "current");
    addClass(currentWord.previousSibling.lastChild, "current");
    removeClass(currentWord.previousSibling.lastChild, "incorrect");
    removeClass(currentWord.previousSibling.lastChild, "correct");
  }

  function moveBackToPreviousLetter() {
    removeClass(currentLetter, "current");
    addClass(currentLetter.previousSibling, "current");
    removeClass(currentLetter.previousSibling, "incorrect");
    removeClass(currentLetter.previousSibling, "correct");
  }

  function moveToLastLetter() {
    addClass(currentWord.lastChild, "current");
    removeClass(currentWord.lastChild, "incorrect");
    removeClass(currentWord.lastChild, "correct");
  }

  function updateMarginTopOfWords() {
    const wordsElement = document.getElementById("words");
    const margin = parseInt(wordsElement.style.marginTop || "0px");
    wordsElement.style.marginTop = margin - 35 + "px";
  }

  function moveCursorToCurrentLetter() {
    const nextLetter = document.querySelector(".letter.current");
    const nextWord = document.querySelector(".word.current");
    const cursor = document.getElementById("cursor");
    cursor.style.top =
      (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
    cursor.style.left =
      (nextLetter || nextWord).getBoundingClientRect()[
        nextLetter ? "left" : "right"
      ] + "px";
  }
}

export { handleKeyUp };
