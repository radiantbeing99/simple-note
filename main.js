// TODO: 로딩 스피너 구현. js 파일 하나 만들어서 내부에 스피너 추가 제거 function을 만드는게 좋을 듯
// FIXME:

import { paintContentTitle, paintContentDescription } from "./modules/paint/paintContent.js";
import { paintTOC } from "./modules/paint/paintTOC.js";
import { createContent } from "./modules/content/createContent.js";
import { updateContent } from "./modules/content/updateContent.js";
import { deleteContent } from "./modules/content/deleteContent.js";
import { paintSignForm } from "./modules/paint/paintSignForm.js";
import { paintQuote } from "./modules/paint/paintQuote.js";
import { paintUserToNav } from "./modules/paint/paintUserToNav.js";

const state = {
  signIn: null,
};

state.signIn = localStorage.getItem("nickname") ? true : false;

paintUserToNav();
paintSignForm("sign-in");
if (state.signIn) {
  const _signForm = document.querySelector("#sign-form");
  const _contentsViewSpace = document.querySelector("#contents-view-space");
  const _signOutButton = document.querySelector("#sign-out-button");
  _signForm.remove();
  _contentsViewSpace.classList.remove("d-none");
  _signOutButton.classList.remove("d-none");
}

const _signOutButton = document.querySelector("#sign-out-button");
_signOutButton.addEventListener("click", (event) => {
  localStorage.removeItem("nickname");
  location.reload();
});
paintQuote();
createContent();
updateContent();
deleteContent();
paintTOC();
paintContentTitle();
paintContentDescription();
