const _contentTitle = document.querySelector(".content-title");
const _contentDescription = document.querySelector(".content-description");
const currentContent = {
  id: 0,
  title: "Welcome to Simple Note",
  description: "A special note just for you.",
};

export function setDefaultContent() {
  currentContent.id = 0;
  currentContent.title = "Welcome to Simple Note";
  currentContent.description = "A special note just for you.";
}

export function setCurrentContent(contentObject) {
  currentContent.id = contentObject.id;
  currentContent.title = contentObject.title;
  currentContent.description = contentObject.description;
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

export function paintContent() {
  paintContentTitle();
  paintContentDescription();
}
