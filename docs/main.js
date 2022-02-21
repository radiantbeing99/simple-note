// FIXME: async fetch API 때문에 글 목록 순서가 뒤바뀜을 확인.

import { paintTOC } from "./modules/paintTOC.js";

const _tableOfContents = document.querySelector(".table-of-contents");
const _contentTitle = document.querySelector(".content-title");
const _contentDescription = document.querySelector(".content-description");

const contents = [];
let currentContent = {
  id: 0,
  title: "Welcome Title",
  description: "Welcome Description",
};

paintTOC();

// content title
_contentTitle.innerText = currentContent.title;

// content description
_contentDescription.innerText = currentContent.description;
