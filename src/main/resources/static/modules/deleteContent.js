import { getCurrentContent, paintContent, setDefaultContent } from "./contentFunctions.js";
import { deleteAPI } from "./controlBackEndAPI.js";
import { paintTOC } from "./paintTOC.js";

function handleClickDelete() {
  const currentContent = getCurrentContent();
  deleteAPI(`contents/${currentContent.id}`, (data) => {
    paintTOC();
    setDefaultContent();
    paintContent();
  });
}

export function deleteContent() {
  const _deleteButton = document.querySelector(".delete-button");
  _deleteButton.addEventListener("click", handleClickDelete);
}
