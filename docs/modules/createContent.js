import { paintContent, setCurrentContent } from "./contentFunctions.js";
import { getAPI, postAPI } from "./controlBackEndAPI.js";
import { paintTOC } from "./paintTOC.js";

const _createButton = document.querySelector(".create-button");
const _contentForm = document.querySelector(".content-form");

const state = {
  formOpen: false,
};

function handleButtonOpen(MAX_CONTENTS_NUM) {
  state.formOpen = true;

  const NEW_ID = MAX_CONTENTS_NUM + 1;

  const form = document.createElement("form");
  const _titleDiv = document.createElement("div");
  const _titleLabel = document.createElement("label");
  const _titleInput = document.createElement("input");
  const _descriptionDiv = document.createElement("div");
  const _descriptionLabel = document.createElement("label");
  const header = document.createElement("h3");
  const hidden = document.createElement("input");
  const _descriptionTextarea = document.createElement("textarea");
  const submit = document.createElement("input");

  // form 설정
  form.classList.add("create-form");
  form.addEventListener("submit", handleSubmit);
  // header 설정
  header.innerText = "Create-Form";
  // hidden 설정
  hidden.classList.add("create-id");
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "id");
  hidden.setAttribute("value", String(NEW_ID));
  // titleDiv 설정
  _titleDiv.classList.add("mb-3");
  // titleLabel 설정
  _titleLabel.setAttribute("for", "inputContentTitle");
  _titleLabel.classList.add("form-label");
  _titleLabel.innerText = "Title";
  // titleInput 설정
  _titleInput.classList.add("create-title", "form-control");
  _titleInput.id = "inputContentTitle";
  _titleInput.setAttribute("type", "text");
  _titleInput.setAttribute("required", "");
  _titleInput.setAttribute("name", "title");
  // descriptionDiv 설정
  _descriptionDiv.classList.add("mb-3");
  // descriptionLabel 설정
  _descriptionLabel.setAttribute("for", "inputDescription");
  _descriptionLabel.classList.add("form-label");
  _descriptionLabel.innerText = "Description";
  // descriptionTextarea 설정
  _descriptionTextarea.classList.add("create-description", "form-control");
  _descriptionTextarea.id = "inputDescription";
  _descriptionTextarea.setAttribute("required", "");
  _descriptionTextarea.setAttribute("name", "description");
  _descriptionTextarea.setAttribute("rows", "10");
  // submit 설정
  submit.classList.add("create-submit", "btn", "btn-primary");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "submit");

  _titleDiv.appendChild(_titleLabel);
  _titleDiv.appendChild(_titleInput);
  form.appendChild(header);
  form.appendChild(_titleDiv);
  form.appendChild(hidden);
  _descriptionDiv.appendChild(_descriptionLabel);
  _descriptionDiv.appendChild(_descriptionTextarea);
  form.appendChild(_descriptionDiv);
  form.appendChild(submit);
  _contentForm.appendChild(form);
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
  console.log(createdContent);
  postAPI("contents", createdContent, paintTOC);
  setCurrentContent(createdContent);
  paintContent();
  handleButtonClose();
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
