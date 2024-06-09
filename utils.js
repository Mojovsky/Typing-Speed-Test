function getRandomQuote() {
  return fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => data.content);
}

export { getRandomQuote };
