const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const AffinidiWallet = require('@affinidi/wallet-node-sdk') 
const app = express();

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
  const options1 = {
    env: 'prod',
    apiKey: 'd22ce62c-3cfe-436b-ac80-6bdcfebdaf43' , //ee1accf234b414ca30f343d731102015860d23be8877e42f70775a469f7f0da6
    didMethod: 'elem' // 'elem' (default) or 'jolo'
  }
  // "@affinidi/wallet-node-sdk": "^6.0.0-beta.10",
  //const { did, encryptedSeed } = await AffinidiWallet.createWallet().createWallet(options1,"rohits")
  //console.log(did)

// const keyParams = { encryptedSeed, password }
// const email = 'example@affinity-project.org'
// const userPassword = 'Password123'
// const options = { env: 'dev' }
// const messageParameters = { message: 'Welcome to Affinity, here is your OTP: {{CODE}}' } //  (optional)

// const token = await AffinidiWallet.createWallet().initiateSignUpByEmail(options, email, userPassword, messageParameters)
// const confirmationCode = '123456'
//const wallet = await AffinidiWallet.createWallet().completeSignUp(options, token, confirmationCode, keyParams)

const username = 'great_user'
const password = 'Password123'
const optionss = { env: 'dev' }

//const wallet = await AffinidiWallet.createWallet().signUpWithUsername(options1, username, password)
//const wallet = await AffinidiWallet.createWallet().logInWithPassword(options1, username, password)

//console.log(wallet.encryptedSeed)
  
  res.json({ message: "Welcome to Affinity application." });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/wallet.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

