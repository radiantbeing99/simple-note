export function paintUserToNav() {
  const userName = localStorage.getItem("nickname");
  let greetingMessage = null;
  if (!userName) {
    greetingMessage = "";
  } else {
    greetingMessage = `Hello, ${userName}`;
  }

  const _userNameSpace = document.querySelector("#user-name-space");
  _userNameSpace.innerText = greetingMessage;
}
