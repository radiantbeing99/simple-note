export function paintAlert(type, reason, message) {
  const _alertMessageSpace = document.querySelector("#alert-message-space");
  const _div = document.createElement("div");
  _div.classList.add("alert", `alert-${type}`, "alert-dismissible");
  _div.setAttribute("role", "alert");
  _div.innerText = `${message} (${reason})`;
  _alertMessageSpace.appendChild(_div);

  const _button = document.createElement("button");
  _button.setAttribute("type", "button");
  _button.classList.add("btn-close");
  _button.setAttribute("data-bs-dismiss", "alert");
  _button.setAttribute("aria-label", "Close");
  _div.appendChild(_button);

  setTimeout(() => {
    _div.remove();
  }, 5000);
}
