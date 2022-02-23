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
  const header = document.createElement("h3");
  const hidden = document.createElement("input");
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");
  const submit = document.createElement("input");

  // form props 설정
  form.classList.add("create-form");
  form.addEventListener("submit", handleSubmit);
  // header props 설정
  header.innerText = "Create-Form";
  // hidden props 설정
  hidden.classList.add("create-id");
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "id");
  hidden.setAttribute("value", String(NEW_ID));
  // input props 설정
  input.classList.add("create-title");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Title");
  input.setAttribute("required", "");
  input.setAttribute("name", "title");
  // textarea props 설정
  textarea.classList.add("create-description");
  textarea.setAttribute("placeholder", "Description");
  textarea.setAttribute("required", "");
  textarea.setAttribute("name", "description");
  // submit props 설정
  submit.classList.add("create-submit");
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
  setCurrentContent(createdContent.id, createdContent.title, createdContent.description);
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
