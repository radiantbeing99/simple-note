import { backEndAddress } from "./global.js";

function useAPI(route, func) {
  fetch(`${backEndAddress}/api/${route}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      func(data);
    });
}

export { useAPI };
