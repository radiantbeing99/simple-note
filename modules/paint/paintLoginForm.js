// FIXME: 로그인 확인 기능 미흡. 로그인이 확인되면 localStrage에 바꾸는 것으로 변경.
// 로그인 확인하는 부분은 따로 인증 폴더를 만들어 떼어내기

import { postAPI } from "../REST_API/controlBackEndAPI.js";

const _loginFormSpace = document.querySelector("#login-form-space");
const _contentsViewSpace = document.querySelector("#contents-view-space");

function handleSubmit(event) {
  event.preventDefault();
  const _formInputID = document.querySelector("#form-input-id");
  const nickname = _formInputID.value;
  localStorage.setItem("nickname", nickname);
  postAPI(
    "members",
    { nickname: nickname },
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
    const _label = document.createElement("label");
    const _input = document.createElement("input");
    const _submit = document.createElement("input");

    // form attributes
    _form.addEventListener("submit", handleSubmit);
    // label attributes
    _label.classList.add("form-label");
    _label.setAttribute("for", "form-input-id");
    _label.innerText = "Nickname";
    // input attributes
    _input.classList.add("form-control", "mb-3");
    _input.setAttribute("required", "");
    _input.setAttribute("type", "text");
    _input.setAttribute("id", "form-input-id");
    // submit attributes
    _submit.classList.add("btn", "btn-primary", "mb-3");
    _submit.setAttribute("type", "submit");
    _submit.setAttribute("value", "Submit");

    _form.appendChild(_label);
    _form.appendChild(_input);
    _form.appendChild(_submit);
    _loginFormSpace.appendChild(_form);
  }
}
