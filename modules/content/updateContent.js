import { paintTOC } from "../render/paintTOC.js";
import { getCurrentContent, setCurrentContent } from "./currentContent.js";
import { paintContent } from "../render/paintContent.js";
import { fetchData } from "../REST_API/fetchData.js";

const _updateButton = document.querySelector("#update-button");
const _contentForm = document.querySelector("#content-update-form-space");

const state = {
  formOpen: false,
};

function handleButtonOpen(content) {
  _contentForm.classList.add("border", "mt-2", "p-4", "bg-light");
  state.formOpen = true;

  const _form = document.createElement("form");
  const _header = document.createElement("h3");
  const _hidden = document.createElement("input");
  const _titleDiv = document.createElement("div");
  const _titleLabel = document.createElement("label");
  const _titleInput = document.createElement("input");
  const _descriptionDiv = document.createElement("div");
  const _descriptionLabel = document.createElement("label");
  const _descriptionTextarea = document.createElement("textarea");
  const _submit = document.createElement("input");

  // form 설정
  _form.classList.add("update-form");
  _form.addEventListener("submit", handleSubmit);
  // header 설정
  _header.innerText = "Update-Form";
  // hidden 설정
  _hidden.classList.add("update-id");
  _hidden.setAttribute("type", "hidden");
  _hidden.setAttribute("name", "id");
  _hidden.setAttribute("value", content.id);
  // titleDiv 설정
  _titleDiv.classList.add("mb-3");
  // titleLabel 설정
  _titleLabel.setAttribute("for", "update-inputContentTitle");
  _titleLabel.classList.add("form-label");
  _titleLabel.innerText = "Title";
  // input 설정
  _titleInput.classList.add("update-title", "form-control");
  _titleInput.id = "update-inputContentTitle";
  _titleInput.setAttribute("type", "text");
  _titleInput.setAttribute("required", "");
  _titleInput.setAttribute("name", "title");
  _titleInput.setAttribute("value", content.title);
  // descriptionDiv 설정
  _descriptionDiv.classList.add("mb-3");
  // descriptionLabel 설정
  _descriptionLabel.setAttribute("for", "update-inputDescription");
  _descriptionLabel.classList.add("form-label");
  _descriptionLabel.innerText = "Description";
  // textarea 설정
  _descriptionTextarea.classList.add("update-description", "form-control");
  _descriptionTextarea.id = "update-inputDescription";
  _descriptionTextarea.setAttribute("required", "");
  _descriptionTextarea.setAttribute("name", "description");
  _descriptionTextarea.innerText = content.description;
  // submit 설정
  _submit.classList.add("update-submit", "btn", "btn-primary", "mb-3");
  _submit.setAttribute("type", "submit");
  _submit.setAttribute("value", "submit");

  _titleDiv.appendChild(_titleLabel);
  _titleDiv.appendChild(_titleInput);
  _descriptionDiv.appendChild(_descriptionLabel);
  _descriptionDiv.appendChild(_descriptionTextarea);
  _form.appendChild(_header);
  _form.appendChild(_hidden);
  _form.appendChild(_titleDiv);
  _form.appendChild(_descriptionDiv);
  _form.appendChild(_submit);
  _contentForm.appendChild(_form);
}

function handleButtonClose() {
  _contentForm.classList.remove("border", "mt-2", "p-4", "bg-light");
  state.formOpen = false;
  const form = document.querySelector(".update-form");
  form.remove();
}

function handleSubmit(event) {
  function paint(contentID) {
    const requestInfo = {
      method: "GET",
      path: `/contents/${contentID}`,
      dataHandler: (content) => {
        setCurrentContent(content);
        paintTOC();
        paintContent();
      },
      errorMessage: "수정된 글의 데이터를 받아오는데 실패하였습니다.",
    };
    fetchData(requestInfo);
  }
  event.preventDefault();
  const id = document.querySelector(".update-id");
  const title = document.querySelector(".update-title");
  const description = document.querySelector(".update-description");
  const updatedContent = { id: id.value, title: title.value, description: description.value };
  const requestInfo = {
    method: "PATCH",
    path: `/contents/${updatedContent.id}`,
    body: updatedContent,
    dataHandler: () => paint(updatedContent.id),
    errorMessage: "수정된 글을 보내는 중 오류가 발생했습니다.",
  };
  fetchData(requestInfo);
  handleButtonClose();
}

export function closeUpdateForm() {
  state.formOpen = false;
  const form = document.querySelector(".update-form");
  if (form !== null) {
    form.remove();
  }
}

export function updateContent() {
  _updateButton.addEventListener("click", () => {
    if (state.formOpen) {
      handleButtonClose();
    } else {
      const requestInfo = {
        method: "GET",
        path: `/contents/${getCurrentContent().id}`,
        dataHandler: (content) => {
          handleButtonOpen(content);
        },
        errorMessage: "선택한 글의 정보를 받아오는데 실패하였습니다.",
      };
      fetchData(requestInfo);
    }
  });
}
