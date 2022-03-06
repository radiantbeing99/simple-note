export const currentContent = {
  id: 0,
  lastModifiedTime: [0, 0, 0, 0, 0, 0],
  title: "Welcome to Simple Note",
  description: "A special note just for you.",
  author: "developer",
};

export function setDefaultContent() {
  currentContent.id = 0;
  currentContent.author = "developer";
  currentContent.lastModifiedTime = [0, 0, 0, 0, 0, 0];
  currentContent.title = "Welcome to Simple Note";
  currentContent.description = "A special note just for you.";
}

export function setCurrentContent(contentObject) {
  currentContent.id = contentObject.id;
  currentContent.lastModifiedTime = contentObject.lastModifiedTime;
  currentContent.title = contentObject.title;
  currentContent.description = contentObject.description;
  currentContent.author = contentObject.author;
}

export function getCurrentContent() {
  return currentContent;
}
