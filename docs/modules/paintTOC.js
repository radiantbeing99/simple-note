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
  useAPI("content/max_contents", (MAX_CONTENTS_NUM) => {
    for (let i = 0; i < MAX_CONTENTS_NUM; i++) {
      useAPI(`content/${i + 1}`, (content) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = content.title;
        a.href = content.id;
        a.addEventListener("click", (event) => handleClickAnchor(event, content.id));
        li.appendChild(a);
        _tableOfContents.appendChild(li);
      });
    }
  });
}
