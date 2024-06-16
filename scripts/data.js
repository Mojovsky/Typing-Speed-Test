function updateElementText(elementId, text) {
  document.getElementById(elementId).innerHTML = text;
}

const getElementText = (elementId) =>
  document.getElementById(elementId).innerHTML;

function storeData() {
  const tests = (parseInt(localStorage.getItem("tests")) || 0) + 1;
  const wpm = localStorage.getItem("wpm")
    ? (parseFloat(localStorage.getItem("wpm")) * tests +
        parseFloat(getElementText("wpm-value"))) /
      (tests + 1)
    : parseFloat(getElementText("wpm-value"));
  const accuracy = localStorage.getItem("accuracy")
    ? (parseFloat(localStorage.getItem("accuracy")) * tests +
        parseFloat(getElementText("accuracy-value").replace("%", ""))) /
      (tests + 1)
    : parseFloat(getElementText("accuracy-value").replace("%", ""));
  const errors = localStorage.getItem("errors")
    ? (parseInt(localStorage.getItem("errors")) * tests +
        parseInt(getElementText("errors-value"))) /
      (tests + 1)
    : parseInt(getElementText("errors-value"));

  updateElementText("tests", tests);
  updateElementText("avg-wpm", wpm.toFixed(0));
  updateElementText("avg-accuracy", accuracy.toFixed(0));
  updateElementText("avg-errors", errors.toFixed(0));

  localStorage.setItem("tests", tests);
  localStorage.setItem("wpm", wpm);
  localStorage.setItem("accuracy", accuracy);
  localStorage.setItem("errors", errors);
}

function getStoredData() {
  return {
    tests: localStorage.getItem("tests") || 0,
    wpm: parseInt(localStorage.getItem("wpm")).toFixed(0) || 0,
    accuracy: parseInt(localStorage.getItem("accuracy")).toFixed(0) || 0,
    errors: parseInt(localStorage.getItem("errors")).toFixed(0) || 0,
  };
}

export { storeData, getStoredData };
