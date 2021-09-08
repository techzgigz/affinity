const crypto = require("crypto");
const fs = require('fs');

export default async function generateKeyPair() {
    try {
        const keyPair = await crypto.generateKeyPair('rsa', {
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
        });
        if (keyPair) {
            // Prints new asymmetric key pair
            console.log("Public Key is : ", publicKey);
            console.log();
            console.log("Private Key is: ", privateKey);

            fs.writeFileSync("./publics", Buffer.from(publicKey));
            fs.writeFileSync("./privates", Buffer.from(privateKey));
            return true
        }
        else {
            // Prints error
            console.log("Errr is: ");
            return false
        }
    }
    catch (e) {

        // Prints error
        console.log("Errr is: ", err);
        return false
    }



}
