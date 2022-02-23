import { getCurrentContent, paintContent, setDefaultContent } from "./contentFunctions.js";
import { deleteAPI } from "./controlBackEndAPI.js";
import { paintTOC } from "./paintTOC.js";

function handleClickDelete() {
  // deleteAPI
  deleteAPI(`contents/${currentContent.id}`, (data) => {
    paintTOC();
    setDefaultContent();
    paintContent();
  });
}

export function deleteContent() {
  const _deleteButton = document.querySelector(".delete-button");
  const currentContent = getCurrentContent();
  _deleteButton.addEventListener("click", handleClickDelete);
}
