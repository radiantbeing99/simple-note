// FIXME:

import { paintContentTitle, paintContentDescription } from "./modules/contentFunctions.js";
import { paintTOC } from "./modules/paintTOC.js";
import { createContent } from "./modules/createContent.js";
import { updateContent } from "./modules/updateContent.js";
import { deleteContent } from "./modules/deleteContent.js";
import { paintLoginForm } from "./modules/paintLoginForm.js";
import { paintQuote } from "./modules/paintQuote.js";

const _updateButton = document.querySelector(".update-button");
const _deleteButton = document.querySelector(".delete-button");
_updateButton.setAttribute("disabled", "");
_deleteButton.setAttribute("disabled", "");

console.log("hello");
paintLoginForm();
paintQuote();
createContent();
updateContent();
deleteContent();
paintTOC();
paintContentTitle();
paintContentDescription();
