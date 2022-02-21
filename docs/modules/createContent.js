import { backEndAddress } from "./global.js";

const _createButton = document.querySelector(".create-button");
const _contentForm = document.querySelector(".content-form");

function handleCreateButton() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");

  // form props 설정
  form.action = `${backEndAddress}/api/content/create`;
  // input props 설정
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Title");
  input.setAttribute("required", "");
  // textarea props 설정
  textarea.setAttribute("placeholder", "Description");
  textarea.setAttribute("required", "");

  form.appendChild(input);
  form.appendChild(document.createElement("br"));
  form.appendChild(textarea);
  _contentForm.appendChild(form);
}

export function createContent() {
  _createButton.addEventListener("click", handleCreateButton);
}
