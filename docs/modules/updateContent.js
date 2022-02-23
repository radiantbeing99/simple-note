import { getAPI, patchAPI } from "./controlBackEndAPI.js";
import { paintTOC } from "./paintTOC.js";
import { getCurrentContent, paintContent, setCurrentContent } from "./contentFunctions.js";

const _updateButton = document.querySelector(".update-button");
const _contentForm = document.querySelector(".content-form");

const state = {
  formOpen: false,
};

function handleButtonOpen(content) {
  state.formOpen = true;

  const form = document.createElement("form");
  const header = document.createElement("h3");
  const hidden = document.createElement("input");
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");
  const submit = document.createElement("input");

  // form attribute 설정
  form.classList.add("update-form");
  form.addEventListener("submit", handleSubmit);
  // header attribute 설정
  header.innerText = "Update-Form";
  // hidden attribute 설정
  hidden.classList.add("update-id");
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "id");
  hidden.setAttribute("value", content.id);
  // input attribute 설정
  input.classList.add("update-title");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Title");
  input.setAttribute("required", "");
  input.setAttribute("name", "title");
  input.setAttribute("value", content.title);
  // textarea attribute 설정
  textarea.classList.add("update-description");
  textarea.setAttribute("placeholder", "Description");
  textarea.setAttribute("required", "");
  textarea.setAttribute("name", "description");
  textarea.innerText = content.description;
  // submit attribute 설정
  submit.classList.add("update-submit");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "submit");

  form.appendChild(header);
  form.appendChild(hidden);
  form.appendChild(input);
  form.appendChild(document.createElement("br"));
  form.appendChild(textarea);
  form.appendChild(document.createElement("br"));
  form.appendChild(submit);
  _contentForm.appendChild(form);
}

function handleButtonClose() {
  state.formOpen = false;
  const form = document.querySelector(".update-form");
  form.remove();
}

function handleSubmit(event) {
  event.preventDefault();
  const id = document.querySelector(".update-id");
  const title = document.querySelector(".update-title");
  const description = document.querySelector(".update-description");
  const updatedContent = { id: id.value, title: title.value, description: description.value };
  console.log(updatedContent, `contents/${updatedContent.id}`);
  patchAPI(`contents/${updatedContent.id}`, updatedContent, paintTOC);
  setCurrentContent(updatedContent.id, updatedContent.title, updatedContent.description);
  paintContent();
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
