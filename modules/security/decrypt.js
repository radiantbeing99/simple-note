export function decrypt(encryptedText, func) {
  fetch("./modules/security/key.json")
    .then((response) => response.json())
    .then((KEY) => {
      const crypt = new JSEncrypt();
      crypt.setPrivateKey(KEY.PRIVATE_KEY);
      const decryptedText = crypt.decrypt(encryptedText);
      func(decryptedText);
    });
}
