import { getAPI, patchAPI } from "../REST_API/controlBackEndAPI.js";
import { paintTOC } from "../paint/paintTOC.js";
import { getCurrentContent, setCurrentContent } from "./currentContent.js";
import { paintContent } from "../paint/paintContent.js";

const _updateButton = document.querySelector("#update-button");
const _contentForm = document.querySelector("#content-form-space");

const state = {
  formOpen: false,
};

function handleButtonOpen(content) {
  state.formOpen = true;

  const _form = document.createElement("form");
  const _header = document.createElement("h3");
  const _hidden = document.createElement("input");
  const _titleDiv = document.createElement("div");
  const _titleLabel = document.createElement("label");
  const _titleInput = document.createElement("input");
  const _descriptionDiv = document.createElement("div");
  const _descriptionLabel = document.createElement("label");
  const _descriptionTextarea = document.createElement("textarea");
  const _submit = document.createElement("input");

  // form 설정
  _form.classList.add("update-form");
  _form.addEventListener("submit", handleSubmit);
  // header 설정
  _header.innerText = "Update-Form";
  // hidden 설정
  _hidden.classList.add("update-id");
  _hidden.setAttribute("type", "hidden");
  _hidden.setAttribute("name", "id");
  _hidden.setAttribute("value", content.id);
  // titleDiv 설정
  _titleDiv.classList.add("mb-3");
  // titleLabel 설정
  _titleLabel.setAttribute("for", "update-inputContentTitle");
  _titleLabel.classList.add("form-label");
  _titleLabel.innerText = "Title";
  // input 설정
  _titleInput.classList.add("update-title", "form-control");
  _titleInput.id = "update-inputContentTitle";
  _titleInput.setAttribute("type", "text");
  _titleInput.setAttribute("required", "");
  _titleInput.setAttribute("name", "title");
  _titleInput.setAttribute("value", content.title);
  // descriptionDiv 설정
  _descriptionDiv.classList.add("mb-3");
  // descriptionLabel 설정
  _descriptionLabel.setAttribute("for", "update-inputDescription");
  _descriptionLabel.classList.add("form-label");
  _descriptionLabel.innerText = "Description";
  // textarea 설정
  _descriptionTextarea.classList.add("update-description", "form-control");
  _descriptionTextarea.id = "update-inputDescription";
  _descriptionTextarea.setAttribute("required", "");
  _descriptionTextarea.setAttribute("name", "description");
  _descriptionTextarea.innerText = content.description;
  // submit 설정
  _submit.classList.add("update-submit", "btn", "btn-primary", "mb-3");
  _submit.setAttribute("type", "submit");
  _submit.setAttribute("value", "submit");

  _titleDiv.appendChild(_titleLabel);
  _titleDiv.appendChild(_titleInput);
  _descriptionDiv.appendChild(_descriptionLabel);
  _descriptionDiv.appendChild(_descriptionTextarea);
  _form.appendChild(_header);
  _form.appendChild(_hidden);
  _form.appendChild(_titleDiv);
  _form.appendChild(_descriptionDiv);
  _form.appendChild(_submit);
  _contentForm.appendChild(_form);
}

function handleButtonClose() {
  state.formOpen = false;
  const form = document.querySelector(".update-form");
  form.remove();
}

function handleSubmit(event) {
  function paint(contentID) {
    getAPI(`contents/${contentID}`, (content) => {
      setCurrentContent(content);
      paintTOC();
      paintContent();
    });
  }
  event.preventDefault();
  const id = document.querySelector(".update-id");
  const title = document.querySelector(".update-title");
  const description = document.querySelector(".update-description");
  const updatedContent = { id: id.value, title: title.value, description: description.value };
  patchAPI(`contents/${updatedContent.id}`, updatedContent, () => paint(updatedContent.id));
  handleButtonClose();
}

export function closeUpdateForm() {
  state.formOpen = false;
  const form = document.querySelector(".update-form");
  if (form !== null) {
    form.remove();
  }
}

export function updateContent() {
  _updateButton.addEventListener("click", () => {
    if (state.formOpen) {
      handleButtonClose();
    } else {
      getAPI(`contents/${getCurrentContent().id}`, (content) => {
        handleButtonOpen(content);
      });
    }
  });
}
