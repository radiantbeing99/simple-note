import { paintAlert } from "./paintAlert.js";

const routes = [{ path: "/", component: "<h1></h1>", parentElement: "adjljads" }];

// tagString: "<a href="/"></a>"
export function createElement(string) {
  const $temp = document.createElement("template");
  $temp.innerHTML = string;
  return $temp.content;
}

export async function render(path) {
  try {
    const route = routes.find((route) => route.path === path);
    const component = route.component;
    const parentElement = route.parentElement;
    parentElement.replaceChildren(await component());
  } catch (reason) {
    paintAlert("danger", `렌더링에 실패하였습니다. (${reason})`);
  }
}
