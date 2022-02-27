// FIXME: error 처리

const backEndAddress = "http://121.170.208.234";
const _alertMessageSpace = document.querySelector("#alert-message-space");

export function getAPI(route, func, errorMessage) {
  fetch(`${backEndAddress}/${route}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      func(data);
    })
    .catch((reason) => {
      // 경고창 출력
      const _div = document.createElement("div");
      _div.classList.add("alert", "alert-danger", "alert-dismissible");
      _div.setAttribute("role", "alert");
      _div.innerText = reason;
      _alertMessageSpace.appendChild(_div);

      const _button = document.createElement("button");
      _button.setAttribute("type", "button");
      _button.classList.add("btn-close");
      _button.setAttribute("data-bs-dismiss", "alert");
      _button.setAttribute("aria-label", "Close");
      _div.appendChild(_button);
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
      // 경고창 출력
      const _div = document.createElement("div");
      _div.classList.add("alert", "alert-danger", "alert-dismissible");
      _div.setAttribute("role", "alert");
      _div.innerText = reason;
      _alertMessageSpace.appendChild(_div);

      const _button = document.createElement("button");
      _button.setAttribute("type", "button");
      _button.classList.add("btn-close");
      _button.setAttribute("data-bs-dismiss", "alert");
      _button.setAttribute("aria-label", "Close");
      _div.appendChild(_button);
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
      // 경고창 출력
      const _div = document.createElement("div");
      _div.classList.add("alert", "alert-danger", "alert-dismissible");
      _div.setAttribute("role", "alert");
      _div.innerText = reason;
      _alertMessageSpace.appendChild(_div);

      const _button = document.createElement("button");
      _button.setAttribute("type", "button");
      _button.classList.add("btn-close");
      _button.setAttribute("data-bs-dismiss", "alert");
      _button.setAttribute("aria-label", "Close");
      _div.appendChild(_button);
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
      // 경고창 출력
      const _div = document.createElement("div");
      _div.classList.add("alert", "alert-danger", "alert-dismissible");
      _div.setAttribute("role", "alert");
      _div.innerText = reason;
      _alertMessageSpace.appendChild(_div);

      const _button = document.createElement("button");
      _button.setAttribute("type", "button");
      _button.classList.add("btn-close");
      _button.setAttribute("data-bs-dismiss", "alert");
      _button.setAttribute("aria-label", "Close");
      _div.appendChild(_button);
    });
}
