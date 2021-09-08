const crypto = require("crypto");
const fs = require('fs');

exports.generateKeyPair = async (req, res) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,    // options
            publicExponent: 0x10101,
            publicKeyEncoding: {
              type: 'pkcs1',
              format: 'pem'
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem',
              cipher: 'aes-192-cbc',
              passphrase: 'affinity'
            }
          }, (err, publicKey, privateKey) => { // Callback function
            if (!err) {
              // Prints new asymmetric key pair
            //   console.log("Public Key is : ", publicKey);
            //   console.log();
            //   console.log("Private Key is: ", privateKey);
            fs.writeFileSync("./public", Buffer.from(publicKey));
            fs.writeFileSync("./private", Buffer.from(privateKey));
            res.status(200).send({ message: "Done" });
            }
            else {
              // Prints error
              console.log("Errr is: ", err);
              res.status(400).send({ message: err  });
            }
        });
}
