import { useAPI } from "./controlBackEndAPI.js";
import { setCurrentContent, paintContentTitle, paintContentDescription } from "./contentFunctions.js";

const _tableOfContents = document.querySelector(".table-of-contents");
const _updateButton = document.querySelector(".update-button");

function handleClickAnchor(event, contentID) {
  event.preventDefault();
  _updateButton.classList.remove("hidden");

  useAPI(`content/${contentID}`, (content) => {
    setCurrentContent(content.id, content.title, content.description);
    paintContentTitle();
    paintContentDescription();
  });
}

export function paintTOC() {
  const paint = useAPI("content/toc", (data) => {
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
