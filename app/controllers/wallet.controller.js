const db = require("../models");
const Wallet = db.wallet;

const { encryptString,decryptString } = require("../dataParse/index");

exports.allWallet = (req, res) => {
  Wallet.find({
    userid: req.body.userid
  }).exec((err, Wallet) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!Wallet) {
      res.status(400).send({ message: "Wallet !" });
      return;
    }
    else
    {
      res.status(200).send(Wallet);
    }
  })
};

exports.insertWallet = async (req, res) => {
  const encryptValue = await encryptString(req, res,"./public",req.body.did);

  Wallet.insertMany({userid: req.body.userid, did: encryptValue}, function (err,wallet) {
    if (err) {
      console.log('could not insert')
      throw err
    }
    if (!wallet) {
      res.status(400).send({ message: "Wallet !" });
      return;
    }
    else
    {
      res.status(200).send(wallet);
    }
    // Wallet.close()
  })
};

exports.getByIDWallet = async (req, res) => {
 
  Wallet.find({
    _id: req.body.id
  }).exec( async (err, Wallet) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!Wallet) {
      res.status(400).send({ message: "Wallet !" });
      return;
    }
    else
    {
      console.log(Wallet)
      const walletDid= Wallet[0].did;
      const did = await decryptString(req, res,"./private",walletDid);
      Wallet[0].did= did;
      res.status(200).send(Wallet);
    }
  })
};