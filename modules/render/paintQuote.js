const _quoteSpace = document.querySelector("#quote-space");

export function paintQuote() {
  renderQuotePlaceholder();
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      const QUOTE_NUMBER = Math.ceil(Math.random() * 1645);
      const quote = {
        author: quotes[QUOTE_NUMBER].author,
        text: quotes[QUOTE_NUMBER].text,
      };

      const _figure = document.createElement("figure");
      _figure.classList.add("text-center", "m-3");
      _figure.id = "quote";

      const _blockquote = document.createElement("blockquote");
      _blockquote.classList.add("blockquote");
      const _p = document.createElement("p");
      _p.innerText = quote.text;
      _blockquote.appendChild(_p);

      const _figcaption = document.createElement("figcaption");
      _figcaption.classList.add("blockquote-footer");
      _figcaption.innerText = quote.author ? quote.author : "unknown";

      _figure.appendChild(_blockquote);
      _figure.append(_figcaption);
      _quoteSpace.appendChild(_figure);

      removeQuotePlaceholder();
    })
    .catch((reason) => console.log(reason));
}

export function renderQuotePlaceholder() {
  const $div = document.createElement("div");
  $div.id = "quote-placeholder";
  $div.classList.add("m-3");

  const $figure = document.createElement("figure");
  $div.appendChild($figure);

  const $blockquote = document.createElement("blockquote");
  $blockquote.classList.add("blockquote");
  $figure.appendChild($blockquote);

  const $p = document.createElement("p");
  $p.classList.add("placeholder-glow");
  $blockquote.appendChild($p);

  const $span1 = document.createElement("span");
  $span1.classList.add("placeholder", "col-9");
  $p.appendChild($span1);

  const $figcaption = document.createElement("figcaption");
  $figcaption.classList.add("placeholder-glow");
  $figure.appendChild($figcaption);

  const $span2 = document.createElement("span");
  $span2.classList.add("placeholder", "col-4");
  $figcaption.appendChild($span2);

  const $quoteSpace = document.querySelector("#quote-space");
  $quoteSpace.appendChild($div);
}

export function removeQuotePlaceholder() {
  const $quotePlaceholder = document.querySelector("#quote-placeholder");
  $quotePlaceholder.remove();
}
