// tagString: "<a href="/"></a>"
function createElement(tagString) {
  const $temp = document.createElement("template");
  $temp.innerText = tagString;
  return $temp.content;
}
