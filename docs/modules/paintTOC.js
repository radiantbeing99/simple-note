import { useAPI } from "./controllerAPI.js";

const _tableOfContents = document.querySelector(".table-of-contents");
const _contentTitle = document.querySelector(".content-title");
const _contentDescription = document.querySelector(".content-description");

function handleClickAnchor(event, contentID) {
  event.preventDefault();
  useAPI(`content/${contentID}`, (content) => {
    _contentTitle.innerText = content.title;
    _contentDescription.innerText = content.description;
  });
}

export function paintTOC() {
  useAPI("content/toc", (data) => {
    const contents = data.contentsTOC;
    contents.forEach((content) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.innerText = content.title;
      a.href = content.id;
      a.addEventListener("click", (event) => handleClickAnchor(event, content.id));
      li.appendChild(a);
      _tableOfContents.appendChild(li);
    });
  });
}
