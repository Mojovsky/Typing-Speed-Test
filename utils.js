const getRenderedQuote = async () => {
  const response = await fetch("http://api.quotable.io/random");
  const data = await response.json();
  const quote = data.content;
  const arr = quote.split("").map((value) => {
    return `<span class="quote-chars">${value}</span>`;
  });
  const quoteSectionHTML = arr.join("");
  return quoteSectionHTML;
};
