const _contentTitle = document.querySelector(".content-title");
const _contentDescription = document.querySelector(".content-description");
const currentContent = {
  id: 0,
  title: "Welcome Title",
  description: "Welcome Description",
};

export function setCurrentContent(id, title, description) {
  currentContent.id = id;
  currentContent.title = title;
  currentContent.description = description;
}

export function getCurrentContent() {
  return currentContent;
}

export function paintContentTitle() {
  _contentTitle.innerText = currentContent.title;
}

export function paintContentDescription() {
  _contentDescription.innerText = currentContent.description;
}
