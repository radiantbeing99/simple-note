// FIXME:

import { paintContentTitle, paintContentDescription } from "./modules/contentFunctions.js";
import { paintTOC } from "./modules/paintTOC.js";
import { createContent } from "./modules/createContent.js";
import { updateContent } from "./modules/updateContent.js";

const _updateButton = document.querySelector(".update-button");

_updateButton.classList.add("hidden");

createContent();
updateContent();
paintTOC();
paintContentTitle();
paintContentDescription();
