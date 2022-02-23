import { backEndAddress } from "./global.js";

export function getAPI(route, func) {
  fetch(`${backEndAddress}/api/${route}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      func(data);
    })
    .catch((error) => console.error("Error:", error));
}

export function postAPI(route, body, func) {
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
      func(data);
    })
    .catch((error) => console.error("Error:", error));
}

export function patchAPI(route, body, func) {
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
      func(data);
    })
    .catch((error) => console.error("Error:", error));
}
