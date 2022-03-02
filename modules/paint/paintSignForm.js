// FIXME: 로그인 확인 기능 미흡. 로그인이 확인되면 localStrage에 바꾸는 것으로 변경.
// 로그인 확인하는 부분은 따로 인증 폴더를 만들어 떼어내기

import { fetchData } from "../REST_API/fetchData.js";
import { encrypt } from "../security/encrypt.js";
import { paintAlert } from "./paintAlert.js";
import { paintUserToNav } from "./paintUserToNav.js";

const _loginFormSpace = document.querySelector("#sign-form-space");
const _contentsViewSpace = document.querySelector("#contents-view-space");

const state = {
  mode: null,
};

export function paintSignForm(signMode) {
  state.mode = signMode;
  let headerText = null;
  let subButtonText = null;
  let submitButtonText = null;
  let subButtonType = null;

  if (signMode === "sign-in") {
    headerText = "Sign In";
    submitButtonText = "Sign In";
    subButtonText = "Sign Up";
    subButtonType = "btn-link";
  } else {
    headerText = "Sign Up";
    submitButtonText = "Sign Up";
    subButtonText = "Cancel";
    subButtonType = "btn-outline-danger";
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
  _form.classList.add("p-4", "border", "bg-light", "mt-5", "mb-5");
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
  _submit.classList.add("btn", "btn-primary", "me-1");
  _submit.setAttribute("type", "submit");
  _submit.setAttribute("value", submitButtonText);
  _submit.id = "form-submit";
  // subButton attributes
  _subButton.classList.add("btn", subButtonType, "ms-1");
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

function removeSignForm() {
  const _signForm = document.querySelector("#sign-form");
  _signForm.remove();
}

function handleSubmit(event, signMode) {
  event.preventDefault();
  const _formInputID = document.querySelector("#form-input-id");
  const _formInputPW = document.querySelector("#form-input-pw");
  const userName = _formInputID.value;
  const password = _formInputPW.value;
  encrypt(password, (encryptedPW) => {
    const requestInfo = {
      method: "POST",
      path: `members/${signMode}`,
      body: { nickname: userName, password: encryptedPW },
      dataHandler: (data) => {
        // Sign In Situation
        if (signMode === "sign-in") {
          if (!data.idMatch) {
            paintAlert("warning", data.errorMessage, "등록되지 않은 유저입니다.");
          } else if (data.idMatch && !data.passWordMatch) {
            paintAlert("warning", data.errorMessage, "비밀번호가 일치하지 않습니다.");
          } else {
            removeSignForm();
            localStorage.setItem("nickname", userName);
            _contentsViewSpace.classList.remove("d-none");
            const _navRightComponents = document.querySelector("#nav-right-components");
            _navRightComponents.classList.remove("d-none");
            paintUserToNav();
          }
          // Sign Up Situation
        } else if (signMode === "sign-up") {
          if (!data.registered) {
            paintAlert("warning", data.errorMessage, "중복된 유저 이름입니다. 다른 이름을 사용해 주세요.");
          } else {
            paintAlert("success", data.errorMessage, "회원 가입에 성공하였습니다!");
            removeSignForm();
            paintSignForm("sign-in");
          }
        }
      },
      errorMessage: "회원 정보를 제출하는 도중에 오류가 발생했습니다.",
    };
    fetchData(requestInfo);
  });
}

function handleClickSubButton(event) {
  removeSignForm();
  if (state.mode === "sign-in") {
    paintSignForm("sign-up");
  } else {
    paintSignForm("sign-in");
  }
}
