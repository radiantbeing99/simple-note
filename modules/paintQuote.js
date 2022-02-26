const _quoteSpace = document.querySelector("#quote-space");

export function paintQuote() {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      const QUOTE_NUMBER = Math.ceil(Math.random() * 1645);
      const quote = {
        author: quotes[QUOTE_NUMBER].author,
        text: quotes[QUOTE_NUMBER].text,
      };

      const _figure = document.createElement("figure");
      _figure.classList.add("text-center");

      const _blockquote = document.createElement("blockquote");
      _blockquote.classList.add("blockquote");
      const _p = document.createElement("p");
      _p.innerText = quote.text;
      _blockquote.appendChild(_p);

      const _figcaption = document.createElement("figcaption");
      _figcaption.classList.add("blockquote-footer");
      _figcaption.innerText = quote.author;

      _figure.appendChild(_blockquote);
      _figure.append(_figcaption);
      _quoteSpace.appendChild(_figure);
    });
}
