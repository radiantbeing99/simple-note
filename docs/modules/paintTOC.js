import { getAPI } from "./controlBackEndAPI.js";
import { setCurrentContent, paintContent } from "./contentFunctions.js";
import { closeUpdateForm } from "./updateContent.js";

const _tableOfContents = document.querySelector(".table-of-contents");
const _updateButton = document.querySelector(".update-button");
const _deleteButton = document.querySelector(".delete-button");

const state = {
  isActive: false,
  isDisabledDeleted: false,
};

function handleClickAnchor(event, contentID) {
  const _listGroupItems = _tableOfContents.querySelectorAll("a");
  const _anchor = event.target;

  event.preventDefault();
  if (state.isDisabledDeleted === false) {
    _updateButton.removeAttribute("disabled");
    _deleteButton.removeAttribute("disabled");
    state.isDisabledDeleted = true;
  }

  _listGroupItems.forEach((item) => {
    item.classList.remove("active");
  });

  _anchor.classList.add("active");

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
      const a = document.createElement("a");
      a.innerText = content.title;
      a.setAttribute("href", content.id);
      a.classList.add("list-group-item", "list-group-item-action");
      a.addEventListener("click", (event) => handleClickAnchor(event, content.id));
      _tableOfContents.appendChild(a);
    });
  });
  if (_tableOfContents.innerHTML === "") {
    paint;
  } else {
    _tableOfContents.innerHTML = "";
    paint;
  }
}
