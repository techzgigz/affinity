const crypto = require("crypto");
const fs = require('fs');

exports.generateKeyPair = async (secret) => {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096,    // options
      //publicExponent: 0x10101,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: secret
      }


      
    }, (err, publicKey, privateKey) => { // Callback function
      if (err) return reject(err);
       console.log('============',(publicKey.toString('hex')))
      // fs.writeFileSync("./public", Buffer.from(privateKey.toString('hex')));
      // fs.writeFileSync("./private", Buffer.from(publicKey.toString('hex')));
      const publicKey1= publicKey.toString('hex');
      const privateKey1= privateKey.toString('hex');
      resolve({ publicKey1, privateKey1 });

    });
  });
}
