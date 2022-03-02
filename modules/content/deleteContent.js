import { getCurrentContent, setDefaultContent } from "./currentContent.js";
import { paintContent } from "../paint/paintContent.js";
import { paintTOC } from "../paint/paintTOC.js";
import { fetchData } from "../REST_API/fetchData.js";

function handleClickDelete() {
  const currentContent = getCurrentContent();
  const requestInfo = {
    method: "DELETE",
    path: `/contents/${currentContent.id}`,
    dataHandler: (data) => {
      paintTOC();
      setDefaultContent();
      paintContent();
    },
    errorMessage: "선택한 글을 삭제하는데 실패하였습니다.",
  };
  fetchData(requestInfo);
}

export function deleteContent() {
  const _deleteButton = document.querySelector("#delete-button");
  _deleteButton.addEventListener("click", handleClickDelete);
}
