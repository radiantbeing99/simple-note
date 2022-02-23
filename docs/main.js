// FIXME:

import { paintContentTitle, paintContentDescription } from "./modules/contentFunctions.js";
import { paintTOC } from "./modules/paintTOC.js";
import { createContent } from "./modules/createContent.js";
import { updateContent } from "./modules/updateContent.js";
import { deleteContent } from "./modules/deleteContent.js";

const _updateButton = document.querySelector(".update-button");
const _deleteButton = document.querySelector(".delete-button");
_updateButton.classList.add("hidden");
_deleteButton.classList.add("hidden");

createContent();
updateContent();
deleteContent();
paintTOC();
paintContentTitle();
paintContentDescription();

/*
const btn = document.createElement("button");
btn.innerText = "paintToc";
btn.addEventListener("click", paintTOC);
document.body.appendChild(btn);
*/
