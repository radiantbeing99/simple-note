// FIXME: error 처리

// 개발 서버
const backEndAddress = "http://krrr8.sytes.net";
// 배포 서버
// const backEndAddress = "https://noteforu.herokuapp.com";

function paintErrorAlert(reason, errorMessage) {
  const _alertMessageSpace = document.querySelector("#alert-message-space");
  const _div = document.createElement("div");
  _div.classList.add("alert", "alert-danger", "alert-dismissible");
  _div.setAttribute("role", "alert");
  _div.innerText = `${errorMessage} (${reason})`;
  _alertMessageSpace.appendChild(_div);

  const _button = document.createElement("button");
  _button.setAttribute("type", "button");
  _button.classList.add("btn-close");
  _button.setAttribute("data-bs-dismiss", "alert");
  _button.setAttribute("aria-label", "Close");
  _div.appendChild(_button);
}

export function getAPI(route, func, errorMessage) {
  fetch(`${backEndAddress}/${route}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      func(data);
    })
    .catch((reason) => {
      paintErrorAlert(reason, errorMessage);
    });
}

export function postAPI(route, body, func, errorMessage) {
  fetch(`${backEndAddress}/${route}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status !== "Good Received") {
        console.log("Error!");
      }
      func(data);
    })
    .catch((reason) => {
      paintErrorAlert(reason, errorMessage);
    });
}

export function patchAPI(route, body, func, errorMessage) {
  fetch(`${backEndAddress}/${route}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== "Good Received") {
        console.log("Error!");
      }
      func(data);
    })
    .catch((reason) => {
      paintErrorAlert(reason, errorMessage);
    });
}

export function deleteAPI(route, func, errorMessage) {
  fetch(`${backEndAddress}/${route}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== "Good Received") {
        console.log("Error!");
      }
      func(data);
    })
    .catch((reason) => {
      paintErrorAlert(reason, errorMessage);
    });
}
