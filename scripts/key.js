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

  function updateCurrentLetterValue(key, expected) {
    if (currentLetter) {
      currentLetter.classList.remove("current");
      currentLetter.classList.toggle("correct", key === expected);
      currentLetter.classList.toggle("incorrect", key !== expected);
      moveToNextLetter();
    } else if (expected === " " && key !== " ") {
      currentWord.classList.remove("current");
      moveToNextWord();
    }
  }

  function moveToNextLetter() {
    currentLetter?.classList.remove("current");
    const nextLetter = currentLetter?.nextElementSibling;
    if (nextLetter) {
      nextLetter.classList.add("current");
    }
  }

  function handleSpaceKeyPress(expected) {
    if (currentLetter && expected !== " ") {
      currentLetter.classList.add("incorrect");
      moveToNextLetter();
    } else if (currentWord && expected === " ") {
      currentWord.classList.remove("current");
      moveToNextWord();
    }
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
      moveToPreviousLetter();
    }
  }

  function moveToPreviousWord() {
    currentWord.classList.remove("current");
    currentWord.previousSibling.classList.add("current");
    currentLetter.classList.remove("current");
    currentWord.previousSibling.lastChild.classList.add("current");
    currentWord.previousSibling.lastChild.classList.remove(
      "incorrect",
      "correct"
    );
  }

  function moveToPreviousLetter() {
    currentLetter.classList.remove("current");
    currentLetter.previousSibling.classList.add("current");
    currentLetter.previousSibling.classList.remove("incorrect", "correct");
  }
}

export { handleKeyUp };
