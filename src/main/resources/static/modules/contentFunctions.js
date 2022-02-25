const _contentTitle = document.querySelector(".content-title");
const _contentDescription = document.querySelector(".content-description");
const _contentLastModified = document.querySelector("#content-last-modified-time");
const currentContent = {
  id: 0,
  lastModifiedTime: null,
  title: "Welcome to Simple Note",
  description: "A special note just for you.",
};

export function setDefaultContent() {
  currentContent.id = 0;
  currentContent.lastModifiedTime = null;
  currentContent.title = "Welcome to Simple Note";
  currentContent.description = "A special note just for you.";
}

export function setCurrentContent(contentObject) {
  currentContent.id = contentObject.id;
  currentContent.lastModifiedTime = contentObject.lastModifiedTime;
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

export function paintContentLastModified() {
  const lastModified = currentContent.lastModifiedTime;
  const years = lastModified[0];
  const months = lastModified[1];
  const days = lastModified[2];
  const hours = lastModified[3];
  const minutes = lastModified[4];
  _contentLastModified.innerText = `Last modified: ${years}년 ${months}월 ${days}일 ${hours}:${minutes}`;
}

export function paintContent() {
  paintContentTitle();
  paintContentDescription();
  paintContentLastModified();
}
