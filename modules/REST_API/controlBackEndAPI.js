const backEndAddress = "http://121.170.208.234";
const _alertMessageSpace = document.querySelector("#alert-message-space");

export function getAPI(route, resolveFunc, rejectFunc) {
  fetch(`${backEndAddress}/api/${route}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resolveFunc(data);
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

      // reject function 실행
      if (rejectFunc !== undefined) {
        rejectFunc();
      }
    });
}

export function postAPI(route, body, resolveFunc, rejectFunc) {
  fetch(`${backEndAddress}/api/${route}`, {
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
      resolveFunc(data);
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

      // reject function 실행
      if (rejectFunc !== undefined) {
        rejectFunc();
      }
    });
}

export function patchAPI(route, body, resolveFunc, rejectFunc) {
  fetch(`${backEndAddress}/api/${route}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== "Good Received") {
        console.log("Error!");
      }
      resolveFunc(data);
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

      // reject function 실행
      if (rejectFunc !== undefined) {
        rejectFunc();
      }
    });
}

export function deleteAPI(route, resolveFunc, rejectFunc) {
  fetch(`${backEndAddress}/api/${route}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== "Good Received") {
        console.log("Error!");
      }
      resolveFunc(data);
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

      // reject function 실행
      if (rejectFunc !== undefined) {
        rejectFunc();
      }
    });
}
