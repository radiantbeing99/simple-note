// TODO: 로딩 스피너 구현. js 파일 하나 만들어서 내부에 스피너 추가 제거 function을 만드는게 좋을 듯
// FIXME:

import { paintContentTitle, paintContentDescription } from "./modules/paint/paintContent.js";
import { paintTOC } from "./modules/paint/paintTOC.js";
import { createContent } from "./modules/content/createContent.js";
import { updateContent } from "./modules/content/updateContent.js";
import { deleteContent } from "./modules/content/deleteContent.js";
import { paintLoginForm } from "./modules/paint/paintLoginForm.js";
import { paintQuote } from "./modules/paint/paintQuote.js";

paintLoginForm();
paintQuote();
createContent();
updateContent();
deleteContent();
paintTOC();
paintContentTitle();
paintContentDescription();
