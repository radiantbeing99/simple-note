import { fetchData } from "../REST_API/fetchData.js";

export function encrypt(plainText, afterEncryptedFunc) {
  const requestInfo = {
    method: "GET",
    path: "/public-key",
    dataHandler: (data) => {
      const crypt = new JSEncrypt();
      crypt.setPublicKey(data.PUBLIC_KEY);
      const encryptedText = crypt.encrypt(plainText);
      afterEncryptedFunc(encryptedText);
    },
    errorMessage: "암호화 도중 오류가 발생하였습니다.",
  };
  fetchData(requestInfo);
}
