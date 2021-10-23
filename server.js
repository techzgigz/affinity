const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
// const AffinidiWallet = require('@affinidi/wallet-node-sdk') 
const app = express();
const crypto = require("crypto");
const fs = require('fs');
const { generateKeyPair } = require("./app/key/index");
const { encryptString, decryptString } = require("./app/dataParse/index");
var corsOptions = {
  origin: "http://localhost:5000"
};
require('dotenv').config({ path: './.env' })
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
var multer = require('multer')

const db = require("./app/models");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'upload')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

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

var upload = multer({ storage: storage }).single('file')


// console.log(issuer)
// simple route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Affinity application." });
  
  const { createVerifiablePresentationJwt, createVerifiableCredentialJwt } = require('did-jwt-vc')
  //var g= await issuer.verifyJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGEwYzQ4NWEwNGZhOGM2NDMzYTI4YSIsImlhdCI6MTYzMjU2OTAyNCwiZXhwIjoxNjMyNjU1NDI0fQ._YOK3P3gr2AYkXsEU_hx9R-Sr-qpeQm-9MJuSiFQ-Lw')
  const secret = 'abcdefg';
  // const hash = crypto.createHmac('sha256', secret)
  //                    .digest('hex');

  const g = new EthrDID.EthrDID({
    identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
    chainNameOrId : 'secret'
  }).did
   console.log(g);
 

  // const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)

  // const vpPayload = {
  //   vp: {
  //     '@context': ['https://www.w3.org/2018/credentials/v1'],
  //     type: ['VerifiablePresentation'],
  //     verifiableCredential: [vcJwt]
  //   }
  // }
  
  // const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer)
  // console.log(vpJwt)
  // console.log(vcJwt)
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
    const KeyPair = await generateKeyPair("secret");
    res.send()
  }
  catch (e) {
    res.status(400).send({ message: e });
  }
  // console.log(KeyPair)
  //res.json({ message: "Welcome to Affinity application." + KeyPair });
});



app.get("/engy", async (req, res) => {
  try {
    const KeyPair = await encryptString(req, res, "./public", "test");
  }
  catch (e) {
    res.status(400).send({ message: e });
  }
});

app.get("/dngy", async (req, res) => {
  try {
    const KeyPair = await decryptString(req, res, "./private", "i+swG6xYCVb6fK11YGWMCaRQlb/Byh0ZYn8ancWab6GZJUK+PWFlOO7WF0T9554PYgjDmbDE3mxiZLew8NbmvIKWrDzAP1JI9JR3v1mGB1/UrFy3NtoRd+/52TrqCBbsalmOXgOpkuJxNeA9JrCnFsCYrQYTNluzyR9yWOec8vs4fb01EhwvlivS8NAHfdPoP8jGhMFQAHorhKZxcKZBUTdxe31P4p0iBzIhyMrf/GV7hBTJipoO6lFYM437XF7BVOAP/k5tqfH493DS5m7Wpf9hBq6xnEPA6TF6LMiNAOmrN7O7xC9XZJilpHo6AlTx3SEi+nrDccHzbRjEj7nS8WNE07LZ0cikPkMGyLOBeD1PzhyfSklTH0cjQm4gEp2ssbSHjKRnijEh2YUD3TYFe9Nkqy07w+eTiCft67ITjbcMg3ScunUdoOIE42JKUh0e7qJ/ptpjAk/HU3+0AZDC8kwcTVplsNQ5oQrspC7w1xmbYTBo9oCJLarEdbdH7kmmZxZQf2OuGF4nJGMBlTkWGd+UPBlovven9wChdK0qhVsxIceGy4NwXhIoDtMesKaubZj4TtvvjZKfiBRDFd1meAwNXxYX7k4bDfxGnOwroCyvbDAx5nZSXFix/qNGVrrqnkhkSbhy/oczqsn7W4lFkaYq8LmrvXfE9pvgrxowpRM=");
  }
  catch (e) {
    res.status(400).send({ message: e });
  }
});

require("./app/routes/auth.routes")(app);
require("./app/routes/wallet.routes")(app,upload);
require("./app/routes/key.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

