const crypto = require("crypto");
const fs = require('fs');

exports.encryptString = async ( publicKey, data) => {
    // const publicKey = fs.readFileSync(publicKeyFile, "utf8");
  
    // publicEncrypt() method with its parameters
    const encrypted = crypto.publicEncrypt(
         publicKey, Buffer.from(data, 'utf8'));
    const encryptString= encrypted.toString("base64");
    return encryptString;
}


exports.decryptString = async (req, res, privateKey, secret,data) => {
    // const privateKey = fs.readFileSync(privateKeyFile, "utf8");
  
    // publicEncrypt() method with its parameters
    const decrypted = crypto.privateDecrypt(
        {
          key: privateKey,
          passphrase: secret,
        },
        Buffer.from(data, "base64")
      );
    
    const decryptedString = decrypted.toString("utf8");
    return decryptedString;
}
