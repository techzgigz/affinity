const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
// const AffinidiWallet = require('@affinidi/wallet-node-sdk') 
const app = express();
const crypto = require("crypto");
const fs = require('fs');
const { generateKeyPair } = require("./app/key/index");

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
// console.log(generateKeyPair)
// // Creating a function to encrypt string
// function encryptString (plaintext, publicKeyFile) {
//   const publicKey = fs.readFileSync(publicKeyFile, "utf8");

//   // publicEncrypt() method with its parameters
//   const encrypted = crypto.publicEncrypt(
//        publicKey, Buffer.from(plaintext));
//   return encrypted.toString("base64");
// }

// //encryptString()
// const plainText = "{GfG}";

// // Defining encrypted text
// const encrypted = encryptString(plainText, "publics");

// // Prints plain text
// console.log("Plaintext:", plainText);

// // Prints encrypted text
// console.log("Encrypted: ", encrypted);

app.get("/key", async (req, res) => {
  try {
    const KeyPair = await generateKeyPair(req, res);
  }
  catch (e) {
    res.status(400).send({ message: e });
  }
  // console.log(KeyPair)
  //res.json({ message: "Welcome to Affinity application." + KeyPair });
});


// console.log(publicKey,privateKey)


require("./app/routes/auth.routes")(app);
require("./app/routes/wallet.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

