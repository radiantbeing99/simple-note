// FIXME: Create Submit 이후 active 안되는 문제
import { paintContent } from "../paint/paintContent.js";
import { setCurrentContent } from "./currentContent.js";
import { getAPI, postAPI } from "../REST_API/controlBackEndAPI.js";
import { paintTOC } from "../paint/paintTOC.js";

const _createButton = document.querySelector("#create-button");
const _contentForm = document.querySelector("#content-form-space");

const state = {
  formOpen: false,
};

export function createContent() {
  _createButton.addEventListener("click", () => {
    if (state.formOpen) {
      handleButtonClose();
    } else {
      handleButtonOpen();
    }
  });
}

function handleButtonOpen() {
  getAPI(
    "contents/max-contents",
    (MAX_CONTENTS_NUM) => {
      state.formOpen = true;

      const NEW_ID = MAX_CONTENTS_NUM + 1;

      const _form = document.createElement("form");
      const _titleDiv = document.createElement("div");
      const _titleLabel = document.createElement("label");
      const _titleInput = document.createElement("input");
      const _descriptionDiv = document.createElement("div");
      const _descriptionLabel = document.createElement("label");
      const _header = document.createElement("h3");
      const _hiddenContentID = document.createElement("input");
      const _hiddenAuthor = document.createElement("input");
      const _descriptionTextarea = document.createElement("textarea");
      const _submit = document.createElement("input");

      // form 설정
      _form.classList.add("create-form");
      _form.addEventListener("submit", handleSubmit);
      // header 설정
      _header.innerText = "Create-Form";
      // hidden Content ID설정
      _hiddenContentID.classList.add("create-id");
      _hiddenContentID.setAttribute("type", "hidden");
      _hiddenContentID.setAttribute("name", "id");
      _hiddenContentID.setAttribute("value", String(NEW_ID));
      // hidden Author 설정
      _hiddenAuthor.id = "create-author";
      _hiddenAuthor.setAttribute("type", "hidden");
      _hiddenAuthor.setAttribute("name", "author");
      _hiddenAuthor.setAttribute("value", localStorage.getItem("nickname"));
      // titleDiv 설정
      _titleDiv.classList.add("mb-3");
      // titleLabel 설정
      _titleLabel.setAttribute("for", "create-inputContentTitle");
      _titleLabel.classList.add("form-label");
      _titleLabel.innerText = "Title";
      // titleInput 설정
      _titleInput.classList.add("create-title", "form-control");
      _titleInput.id = "create-inputContentTitle";
      _titleInput.setAttribute("type", "text");
      _titleInput.setAttribute("required", "");
      _titleInput.setAttribute("name", "title");
      // descriptionDiv 설정
      _descriptionDiv.classList.add("mb-3");
      // descriptionLabel 설정
      _descriptionLabel.setAttribute("for", "create-inputDescription");
      _descriptionLabel.classList.add("form-label");
      _descriptionLabel.innerText = "Description";
      // descriptionTextarea 설정
      _descriptionTextarea.classList.add("create-description", "form-control");
      _descriptionTextarea.id = "create-inputDescription";
      _descriptionTextarea.setAttribute("required", "");
      _descriptionTextarea.setAttribute("name", "description");
      _descriptionTextarea.setAttribute("rows", "10");
      // submit 설정
      _submit.classList.add("create-submit", "btn", "btn-primary", "mb-3");
      _submit.setAttribute("type", "submit");
      _submit.setAttribute("value", "Submit");

      _titleDiv.appendChild(_titleLabel);
      _titleDiv.appendChild(_titleInput);
      _form.appendChild(_header);
      _form.appendChild(_titleDiv);
      _form.appendChild(_hiddenContentID);
      _form.appendChild(_hiddenAuthor);
      _descriptionDiv.appendChild(_descriptionLabel);
      _descriptionDiv.appendChild(_descriptionTextarea);
      _form.appendChild(_descriptionDiv);
      _form.appendChild(_submit);
      _contentForm.appendChild(_form);
    },
    "등록된 글의 개수를 받아오는데 실패하였습니다."
  );
}

function handleButtonClose() {
  state.formOpen = false;
  const form = document.querySelector(".create-form");
  form.remove();
}

function handleSubmit(event) {
  function paint(contentID) {
    getAPI(
      `contents/${contentID}`,
      (content) => {
        setCurrentContent(content);
        paintTOC();
        paintContent();
      },
      "생성된 글의 정보를 받아오는데 실패하였습니다."
    );
  }
  event.preventDefault();
  const id = document.querySelector(".create-id");
  const title = document.querySelector(".create-title");
  const description = document.querySelector(".create-description");
  const author = document.querySelector("#create-author");
  const createdContent = { id: id.value, author: author.value, title: title.value, description: description.value };
  postAPI("contents", createdContent, () => paint(createdContent.id));
  handleButtonClose();
  // active 코드
}
