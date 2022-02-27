import { getCurrentContent, setDefaultContent } from "./currentContent.js";
import { paintContent } from "../paint/paintContent.js";
import { deleteAPI } from "../REST_API/controlBackEndAPI.js";
import { paintTOC } from "../paint/paintTOC.js";

function handleClickDelete() {
  const currentContent = getCurrentContent();
  deleteAPI(`contents/${currentContent.id}`, (data) => {
    paintTOC();
    setDefaultContent();
    paintContent();
  });
}

export function deleteContent() {
  const _deleteButton = document.querySelector("#delete-button");
  _deleteButton.addEventListener("click", handleClickDelete);
}
