// TODO:
// FIXME: submit 했을 때 다른 페이지로 넘어가는 문제 수정.

import { backEndAddress } from "./global.js";
import { useAPI } from "./controlBackEndAPI.js";

const _createButton = document.querySelector(".create-button");
const _contentForm = document.querySelector(".content-form");

const state = {
  formOpen: false,
};

function handleButtonOpen(MAX_CONTENTS_NUM) {
  state.formOpen = true;

  const NEW_ID = MAX_CONTENTS_NUM + 1;

  const iframe = document.createElement("iframe");
  const form = document.createElement("form");
  const header = document.createElement("h3");
  const hidden = document.createElement("input");
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");
  const submit = document.createElement("input");

  // iframe props 설정
  iframe.setAttribute("id", "iframe-create");
  iframe.classList.add("hidden");
  // form props 설정
  form.classList.add("create-form");
  form.setAttribute("action", `${backEndAddress}/api/content/create`);
  form.setAttribute("method", "post");
  form.setAttribute("target", "iframe-create");
  //form.addEventListener("submit", (event) => handleSubmit(event, form));
  // header props 설정
  header.innerText = "Create-Form";
  // hidden props 설정
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "id");
  hidden.setAttribute("value", String(NEW_ID));
  // input props 설정
  input.classList.add("form-title");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Title");
  input.setAttribute("required", "");
  input.setAttribute("name", "title");
  // textarea props 설정
  textarea.classList.add("form-description");
  textarea.setAttribute("placeholder", "Description");
  textarea.setAttribute("required", "");
  textarea.setAttribute("name", "description");
  // submit props 설정
  submit.classList.add("form-submit");
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
  _contentForm.appendChild(iframe);
}

function handleButtonClose() {
  state.formOpen = false;
  const form = document.querySelector(".create-form");
  form.remove();
}

function handleSubmit(event, form) {
  event.preventDefault();
  console.log(event);
  console.log(form);
  form.submit();
  //   const form = document.querySelector(".create-form");
  //   form.submit();
  //   handleButtonClose();
  //   paintTOC();
  //   useAPI(`content/${NEW_ID}`, (content) => {
  //     setCurrentContent(content.id, content.title, content.description);
  //     paintContentTitle();
  //     paintContentDescription();
  //   });
}

export function createContent() {
  useAPI("content/max_contents", (MAX_CONTENTS_NUM) => {
    _createButton.addEventListener("click", () => {
      if (state.formOpen) {
        handleButtonClose();
      } else {
        handleButtonOpen(MAX_CONTENTS_NUM);
      }
    });
  });
}
