import { getAPI } from "../REST_API/controlBackEndAPI.js";

export function encrypt(plainText, afterEncryptedFunc) {
  getAPI(
    "public-key",
    (data) => {
      const crypt = new JSEncrypt();
      crypt.setPublicKey(data.PUBLIC_KEY);
      const encryptedText = crypt.encrypt(plainText);
      afterEncryptedFunc(encryptedText);
    },
    "암호화 도중 오류가 발생하였습니다."
  );
}
