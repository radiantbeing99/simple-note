export const currentContent = {
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
