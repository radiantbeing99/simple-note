export function encrypt(plainText, func) {
  fetch("./modules/security/key.json")
    .then((response) => response.json())
    .then((KEY) => {
      const crypt = new JSEncrypt();
      crypt.setPublicKey(KEY.PUBLIC_KEY);
      const encryptedText = crypt.encrypt(plainText);
      func(encryptedText);
    });
}
