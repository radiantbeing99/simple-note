// FIXME: Create Submit 이후 active 안되는 문제

import { paintContent, setCurrentContent } from "./contentFunctions.js";
import { getAPI, postAPI } from "./controlBackEndAPI.js";
import { activeButton, paintTOC } from "./paintTOC.js";

const _createButton = document.querySelector(".create-button");
const _contentForm = document.querySelector(".content-form");

const state = {
  formOpen: false,
};

function handleButtonOpen(MAX_CONTENTS_NUM) {
  state.formOpen = true;

  const NEW_ID = MAX_CONTENTS_NUM + 1;

  const _form = document.createElement("form");
  const _titleDiv = document.createElement("div");
  const _titleLabel = document.createElement("label");
  const _titleInput = document.createElement("input");
  const _descriptionDiv = document.createElement("div");
  const _descriptionLabel = document.createElement("label");
  const _header = document.createElement("h3");
  const _hidden = document.createElement("input");
  const _descriptionTextarea = document.createElement("textarea");
  const _submit = document.createElement("input");

  // form 설정
  _form.classList.add("create-form");
  _form.addEventListener("submit", handleSubmit);
  // header 설정
  _header.innerText = "Create-Form";
  // hidden 설정
  _hidden.classList.add("create-id");
  _hidden.setAttribute("type", "hidden");
  _hidden.setAttribute("name", "id");
  _hidden.setAttribute("value", String(NEW_ID));
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
  _submit.setAttribute("value", "submit");

  _titleDiv.appendChild(_titleLabel);
  _titleDiv.appendChild(_titleInput);
  _form.appendChild(_header);
  _form.appendChild(_titleDiv);
  _form.appendChild(_hidden);
  _descriptionDiv.appendChild(_descriptionLabel);
  _descriptionDiv.appendChild(_descriptionTextarea);
  _form.appendChild(_descriptionDiv);
  _form.appendChild(_submit);
  _contentForm.appendChild(_form);
}

function handleButtonClose() {
  state.formOpen = false;
  const form = document.querySelector(".create-form");
  form.remove();
}

function handleSubmit(event) {
  event.preventDefault();
  const id = document.querySelector(".create-id");
  const title = document.querySelector(".create-title");
  const description = document.querySelector(".create-description");
  const createdContent = { id: id.value, title: title.value, description: description.value };
  postAPI("contents", createdContent, paintTOC);
  setCurrentContent(createdContent);
  paintContent();
  handleButtonClose();
  // active 코드
}

export function createContent() {
  getAPI("contents/max_contents", (MAX_CONTENTS_NUM) => {
    _createButton.addEventListener("click", () => {
      if (state.formOpen) {
        handleButtonClose();
      } else {
        handleButtonOpen(MAX_CONTENTS_NUM);
      }
    });
  });
}
