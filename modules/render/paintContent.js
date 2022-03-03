import { currentContent } from "../content/currentContent.js";

const _contentTitle = document.querySelector("#content-title-space");
const _contentDescription = document.querySelector("#content-description-space");
const _contentLastModified = document.querySelector("#content-last-modified-time");
const _contentAuthor = document.querySelector("#content-author-space");

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

export function paintContentAuthor() {
  _contentAuthor.innerText = `Author: ${currentContent.author}`;
}

export function paintContent() {
  paintContentTitle();
  paintContentDescription();
  paintContentLastModified();
  paintContentAuthor();
}
