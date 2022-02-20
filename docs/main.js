const _tableOfContents = document.querySelector(".table-of-contents");
const _contentTitle = document.querySelector(".content-title");
const _contentDescription = document.querySelector(".content-description");

const contents = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
  },
  { id: 2, title: "Title 2", description: "description 2" },
];

const currentContent = {
  id: 0,
  title: "Welcome Title",
  description: "Welcome Description",
};

// table of contents
// function findContentById(array) {
//   if ()
// }

function handleClickAnchor(event) {
  event.preventDefault();
  _contentTitle.innerText = contents[0].title;
  _contentDescription.innerText = contents[0].description;
}

contents.forEach((content) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.innerText = content.title;
  a.href = content.id;
  a.addEventListener("click", handleClickAnchor);
  li.appendChild(a);
  _tableOfContents.appendChild(li);
});

// content title
_contentTitle.innerText = currentContent.title;

// content description
_contentDescription.innerText = currentContent.description;
