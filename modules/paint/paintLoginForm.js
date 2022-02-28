// FIXME: 로그인 확인 기능 미흡. 로그인이 확인되면 localStrage에 바꾸는 것으로 변경.
// 로그인 확인하는 부분은 따로 인증 폴더를 만들어 떼어내기

import { postAPI } from "../REST_API/controlBackEndAPI.js";

const _loginFormSpace = document.querySelector("#login-form-space");
const _contentsViewSpace = document.querySelector("#contents-view-space");

function handleSubmit(event) {
  event.preventDefault();
  const _formInputID = document.querySelector("#form-input-id");
  const _formInputPW = document.querySelector("#form-input-pw");
  const userName = _formInputID.value;
  const password = _formInputPW.value;
  // 인증을 받은 뒤에 하는 localStorage에 바꾸는 것으로 변경
  localStorage.setItem("nickname", userName);
  postAPI(
    "members",
    { nickname: userName, password: password },
    () => {
      _loginFormSpace.remove();
      _contentsViewSpace.classList.remove("invisible");
    },
    "로그인 정보를 제출하는 도중에 오류가 발생했습니다."
  );
}

export function paintLoginForm() {
  if (localStorage.getItem("nickname") !== null) {
    _contentsViewSpace.classList.remove("invisible");
  } else {
    const _form = document.createElement("form");
    const _userNameLabel = document.createElement("label");
    const _userNameInput = document.createElement("input");
    const _passwordLabel = document.createElement("label");
    const _passwordInput = document.createElement("input");
    const _submit = document.createElement("input");

    // form attributes
    _form.addEventListener("submit", handleSubmit);
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
    _submit.setAttribute("value", "Submit");

    _form.appendChild(_userNameLabel);
    _form.appendChild(_userNameInput);
    _form.appendChild(_passwordLabel);
    _form.appendChild(_passwordInput);
    _form.appendChild(_submit);
    _loginFormSpace.appendChild(_form);
  }
}
