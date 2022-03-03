import { setCurrentContent } from "../content/currentContent.js";
import { paintContent } from "./paintContent.js";
import { closeUpdateForm } from "../content/updateContent.js";
import { fetchData } from "../REST_API/fetchData.js";

const _tableOfContents = document.querySelector("#table-of-contents");
const _updateButton = document.querySelector("#update-button");
const _deleteButton = document.querySelector("#delete-button");

const state = {
  updateButtonVisible: false,
  deleteButtonVisible: false,
};

export function paintTOC() {
  _tableOfContents.appendChild(getSpinnerElement());
  const requestInfo = {
    method: "GET",
    path: "/contents/toc",
    dataHandler: (data) => {
      const contents = data.contentsTOC;
      contents.forEach((content) => {
        const a = document.createElement("a");
        a.innerText = content.title;
        a.setAttribute("href", `/contents/${content.id}`);
        a.setAttribute("id", `content-${content.id}`);
        a.classList.add("list-group-item", "list-group-item-action");
        a.addEventListener("click", (event) => handleClickAnchor(event, content.id));
        _tableOfContents.appendChild(a);
      });
      const $spinner = document.querySelector("#table-of-contents .spinner-border");
      $spinner.remove();
    },
    errorMessage: "글 목록을 가져오는데 실패하였습니다.",
  };
  fetchData(requestInfo);
}

function handleClickAnchor(event, contentID) {
  event.preventDefault();

  if (!state.updateButtonVisible && !state.deleteButtonVisible) {
    _updateButton.removeAttribute("disabled");
    _deleteButton.removeAttribute("disabled");
    state.updateButtonVisible = true;
    state.deleteButtonVisible = true;
  }

  const _anchor = event.target;
  const _listGroupItems = _tableOfContents.querySelectorAll("a");
  _listGroupItems.forEach((item) => {
    item.classList.remove("active");
  });
  _anchor.classList.add("active");

  const requestInfo = {
    method: "GET",
    path: `/contents/${contentID}`,
    dataHandler: (content) => {
      setCurrentContent(content);
      paintContent();
      closeUpdateForm();
    },
    errorMessage: "선택한 글의 데이터를 받아오는데 실패하였습니다.",
  };
  fetchData(requestInfo);
}

export function activeButton(element) {
  element.classList.add("active");
}

function getSpinnerElement() {
  const $span = document.createElement("span");
  $span.classList.add("visually-hidden");
  $span.innerText = "Loading...";

  const $div = document.createElement("div");
  $div.classList.add("spinner-border");
  $div.setAttribute("role", "status");
  $div.appendChild($span);

  return $div;
}
