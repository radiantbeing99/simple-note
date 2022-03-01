import { paintAlert } from "../paint/paintAlert.js";

// FIXME: error 처리

// 개발 서버
// const backEndAddress = "http://krrr8.sytes.net";
// 배포 서버
const backEndAddress = "https://noteforu.herokuapp.com";

export function getAPI(route, afterGetDataFunction, errorMessage) {
  fetch(`${backEndAddress}/${route}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      afterGetDataFunction(data);
    })
    .catch((reason) => {
      paintAlert("danger", reason, errorMessage);
    });
}

export function postAPI(route, body, afterGetDataFunction, errorMessage) {
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
      afterGetDataFunction(data);
    })
    .catch((reason) => {
      paintAlert("danger", reason, errorMessage);
    });
}

export function patchAPI(route, body, afterGetDataFunction, errorMessage) {
  fetch(`${backEndAddress}/${route}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      afterGetDataFunction(data);
    })
    .catch((reason) => {
      paintAlert("danger", reason, errorMessage);
    });
}

export function deleteAPI(route, afterGetDataFunction, errorMessage) {
  fetch(`${backEndAddress}/${route}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      afterGetDataFunction(data);
    })
    .catch((reason) => {
      paintAlert("danger", reason, errorMessage);
    });
}
