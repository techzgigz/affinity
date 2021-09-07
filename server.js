const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
// const AffinidiWallet = require('@affinidi/wallet-node-sdk') 
const app = express();
const crypto = require("crypto");
const fs = require('fs');
var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`${dbConfig.HOST2}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", async (req, res) => {

  res.json({ message: "Welcome to Affinity application." });
});
app.get("/key", async (req, res) => {

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
      console.log("Public Key is : ", publicKey);
      console.log();
      console.log("Private Key is: ", privateKey);

      fs.writeFileSync("public.pem", Buffer.from(publicKey));
      fs.writeFileSync("private.pem", Buffer.from(privateKey));
    }
    else {
      // Prints error
      console.log("Errr is: ", err);
    }

  });

  res.json({ message: "Welcome to Affinity application." });
});


// console.log(publicKey,privateKey)


require("./app/routes/auth.routes")(app);
require("./app/routes/wallet.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

