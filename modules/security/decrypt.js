import { getAPI } from "../REST_API/controlBackEndAPI.js";

export function decrypt(plainText, afterDecryptedFunc) {
  getAPI(
    "public-key",
    (PUBLIC_KEY) => {
      const crypt = new JSEncrypt();
      crypt.setPublicKey(PUBLIC_KEY);
      const decryptedText = crypt.decrypt(plainText);
      afterDecryptedFunc(decryptedText);
    },
    "복호화 도중 오류가 발생하였습니다."
  );
}
