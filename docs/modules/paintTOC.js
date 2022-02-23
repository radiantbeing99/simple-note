import { getAPI } from "./controlBackEndAPI.js";
import { setCurrentContent, paintContent } from "./contentFunctions.js";
import { closeUpdateForm } from "./updateContent.js";

const _tableOfContents = document.querySelector(".table-of-contents");
const _updateButton = document.querySelector(".update-button");
const _deleteButton = document.querySelector(".delete-button");

function handleClickAnchor(event, contentID) {
  event.preventDefault();
  _updateButton.classList.remove("hidden");
  _deleteButton.classList.remove("hidden");

  getAPI(`contents/${contentID}`, (content) => {
    setCurrentContent(content);
    paintContent();
    closeUpdateForm();
  });
}

export function paintTOC() {
  const paint = getAPI("contents/toc", (data) => {
    const contents = data.contentsTOC;
    contents.forEach((content) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.innerText = content.title;
      a.setAttribute("href", content.id);
      a.addEventListener("click", (event) => handleClickAnchor(event, content.id));
      li.appendChild(a);
      _tableOfContents.appendChild(li);
    });
  });
  if (_tableOfContents.innerHTML === "") {
    paint;
  } else {
    _tableOfContents.innerHTML = "";
    paint;
  }
}
