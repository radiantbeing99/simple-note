import { paintAlert } from "../render/paintAlert.js";

// 개발 서버
// const backEndAddress = "http://krrr8.sytes.net";
// 배포 서버
const backEndServer = "https://noteforu.herokuapp.com";

/*
const requestInfo = 
{
  method: "POST",
  path: "/contents",
  body: {
    id: 2,
    author: "KIM",
    ...
  },
  dataHandler: () => {},
  errorMessage: "글 목록 불러오기 실패"
}
*/

export async function fetchData(requestInfo) {
  const path = requestInfo.path;
  const requestInit = generateRequestInit(requestInfo);
  const dataHandler = requestInfo.dataHandler;
  const errorMessage = requestInfo.errorMessage;

  try {
    const response = await fetch(`${backEndServer}${path}`, requestInit);
    const data = await response.json();
    dataHandler(data);
  } catch (reason) {
    const alertMessage = `${errorMessage} (${reason})`;
    paintAlert("danger", alertMessage);
  }
}

function generateRequestInit(requestInfo) {
  let requestInit = null;

  switch (requestInfo.method) {
    case "GET":
      requestInit = { method: "GET" };
      break;
    case "POST":
      requestInit = {
        method: "POST",
        body: JSON.stringify(requestInfo.body),
        headers: {
          "Content-Type": "application/json",
        },
      };
      break;
    case "PATCH":
      requestInit = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestInfo.body),
      };
      break;
    case "DELETE":
      requestInit = {
        method: "DELETE",
      };
      break;
    default:
      console.log(`${method} is not a type of fetch method.`);
  }

  return requestInit;
}
