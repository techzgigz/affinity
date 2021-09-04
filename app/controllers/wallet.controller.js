const db = require("../models");
const Wallet = db.wallet;

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

exports.insertWallet = (req, res) => {
  Wallet.insertMany({userid: req.body.userid, did: req.body.did}, function (err,wallet) {
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
