// FIXME: 로그인 확인 기능 미흡. 로그인이 확인되면 localStrage에 바꾸는 것으로 변경.
// 로그인 확인하는 부분은 따로 인증 폴더를 만들어 떼어내기

import { postAPI } from "../REST_API/controlBackEndAPI.js";
import { encrypt } from "../security/encrypt.js";

const _loginFormSpace = document.querySelector("#sign-form-space");
const _contentsViewSpace = document.querySelector("#contents-view-space");

const state = {
  mode: null,
};

function handleSubmit(event, route) {
  event.preventDefault();
  const _formInputID = document.querySelector("#form-input-id");
  const _formInputPW = document.querySelector("#form-input-pw");
  const userName = _formInputID.value;
  const password = _formInputPW.value;
  encrypt(password, (encryptedPW) => {
    // 인증을 받은 뒤에 하는 localStorage에 바꾸는 것으로 변경
    localStorage.setItem("nickname", userName);
    postAPI(
      `members/${route}`,
      { nickname: userName, password: encryptedPW },
      () => {
        _loginFormSpace.remove();
        _contentsViewSpace.classList.remove("invisible");
      },
      "회원 정보를 제출하는 도중에 오류가 발생했습니다."
    );
  });
}

function removeSignForm() {
  const _signForm = document.querySelector("#sign-form");
  _signForm.remove();
}

export function paintSignForm(signMode) {
  state.mode = signMode;
  let headerText = null;
  let subButtonText = null;
  let submitButtonText = null;

  if (signMode === "sign-in") {
    headerText = "Sign In";
    submitButtonText = "Sign In";
    subButtonText = "Sign Up";
  } else {
    headerText = "Sign Up";
    submitButtonText = "Sign Up";
    subButtonText = "Cancel";
  }

  const _form = document.createElement("form");
  const _header = document.createElement("h3");
  const _userNameLabel = document.createElement("label");
  const _userNameInput = document.createElement("input");
  const _passwordLabel = document.createElement("label");
  const _passwordInput = document.createElement("input");
  const _submit = document.createElement("input");
  const _subButton = document.createElement("button");

  // form attributes
  _form.addEventListener("submit", (event) => handleSubmit(event, signMode));
  _form.id = "sign-form";
  // header attributes
  _header.innerText = headerText;
  _header.classList.add("mb-3");
  _header.id = "form-header";
  // userNameLabel attributes
  _userNameLabel.classList.add("form-label");
  _userNameLabel.setAttribute("for", "form-input-id");
  _userNameLabel.innerText = "Name";
  // userNameInput attributes
  _userNameInput.classList.add("form-control", "mb-3");
  _userNameInput.setAttribute("required", "");
  _userNameInput.setAttribute("type", "text");
  _userNameInput.setAttribute("id", "form-input-id");
  // passwordLabel attributes
  _passwordLabel.classList.add("form-label");
  _passwordLabel.setAttribute("for", "form-input-pw");
  _passwordLabel.innerText = "Password";
  // passwordInput attributes
  _passwordInput.classList.add("form-control", "mb-3");
  _passwordInput.setAttribute("required", "");
  _passwordInput.setAttribute("type", "password");
  _passwordInput.setAttribute("id", "form-input-pw");
  // submit attributes
  _submit.classList.add("btn", "btn-primary", "mb-3");
  _submit.setAttribute("type", "submit");
  _submit.setAttribute("value", submitButtonText);
  _submit.id = "form-submit";
  // subButton attributes
  _subButton.classList.add("btn", "btn-link", "mb-3");
  _subButton.setAttribute("type", "button");
  _subButton.innerText = subButtonText;
  _subButton.addEventListener("click", handleClickSubButton);
  _subButton.id = "sign-up-button";

  _form.appendChild(_header);
  _form.appendChild(_userNameLabel);
  _form.appendChild(_userNameInput);
  _form.appendChild(_passwordLabel);
  _form.appendChild(_passwordInput);
  _form.appendChild(_submit);
  _form.appendChild(_subButton);
  _loginFormSpace.appendChild(_form);
}

function handleClickSubButton(event) {
  removeSignForm();
  if (state.mode === "sign-in") {
    paintSignForm("sign-up");
  } else {
    paintSignForm("sign-in");
  }
}
