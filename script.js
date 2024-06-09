import { getRandomQuote } from "./utils.js";

const elements = {
  typingTag: document.querySelector(".typing-box p"),
  mistakeTag: document.querySelector(".mistakes span"),
  timerTag: document.querySelector(".timer span b"),
  wpmTag: document.querySelector(".wpm span"),
  cpmTag: document.querySelector(".cpm span"),
  btn: document.querySelector(".details button"),
  inputField: document.querySelector(".input-field"),
};

const maxTime = 60;
let timer,
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false;

async function loadQuote() {
  const quote = await getRandomQuote();
  elements.typingTag.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.textContent = character;
    elements.typingTag.appendChild(characterSpan);
  });
  elements.typingTag.querySelector("span").classList.add("active");
  elements.inputField.focus();
}

function handleInput() {
  const chars = elements.typingTag.querySelectorAll("span");
  const typedChar = elements.inputField.value.split("")[charIndex];

  if (charIndex < chars.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      startTimer();
      isTyping = true;
    }

    if (typedChar == null) {
      charIndex--;
      if (chars[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      chars[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (chars[charIndex].textContent === typedChar) {
        chars[charIndex].classList.add("correct");
      } else {
        mistakes++;
        chars[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    chars.forEach((span) => span.classList.remove("active"));
    chars[charIndex].classList.add("active");
    updateStats();
  } else {
    reset();
  }
}

function startTimer() {
  setInterval(() => {
    timeLeft--;
    elements.timerTag.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function updateStats() {
  elements.mistakeTag.textContent = mistakes;
  elements.cpmTag.textContent = charIndex - mistakes;
  let wpm = Math.round(((charIndex - mistakes) / 5 / (timeLeft + 1)) * 60);
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  elements.wpmTag.textContent = wpm;
}

function reset() {
  loadQuote();
  elements.inputField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  elements.cpmTag.textContent = charIndex - mistakes;
  elements.timerTag.textContent = timeLeft;
  elements.mistakeTag.textContent = 0;
  elements.wpmTag.textContent = 0;
}

elements.inputField.addEventListener("input", handleInput);
elements.btn.addEventListener("click", reset);
loadQuote();
