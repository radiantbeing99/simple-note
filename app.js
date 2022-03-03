// TODO: 로딩 스피너 구현. js 파일 하나 만들어서 내부에 스피너 추가 제거 function을 만드는게 좋을 듯
// FIXME:

import { paintContentTitle, paintContentDescription } from "./modules/render/paintContent.js";
import { paintTOC } from "./modules/render/paintTOC.js";
import { createContent } from "./modules/content/createContent.js";
import { updateContent } from "./modules/content/updateContent.js";
import { deleteContent } from "./modules/content/deleteContent.js";
import { paintSignForm } from "./modules/render/paintSignForm.js";
import { paintQuote, removeQuotePlaceholder, renderQuotePlaceholder } from "./modules/render/paintQuote.js";
import { renderNavigationBar, renderUserNameInNav } from "./modules/render/renderNavigationBar.js";

const state = {
  signIn: null,
};

state.signIn = localStorage.getItem("nickname") ? true : false;

renderNavigationBar();
renderUserNameInNav();
paintSignForm("sign-in");

if (state.signIn) {
  const _signForm = document.querySelector("#sign-form");
  const _contentsViewSpace = document.querySelector("#contents-view-space");
  const _navRightComponents = document.querySelector("#nav-right-components");
  _signForm.remove();
  _contentsViewSpace.classList.remove("d-none");
  _navRightComponents.classList.remove("d-none");
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
