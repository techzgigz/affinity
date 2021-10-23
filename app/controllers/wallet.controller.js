const db = require("../models");
const Wallet = db.wallet;

const { encryptString,decryptString } = require("../dataParse/index");
const { createVerifiableCredentialJwt ,createVerifiablePresentationJwt} = require('did-jwt-vc')
const { getissuer } = require("../key/issuer");

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
//  console.log('=====insertWallet========', req.body.did)
  const encryptValue = await encryptString(req.body.publicKey,req.body.did);
  const vcPayload = {
    sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4',
    nbf: 1562950282,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        document: {
          type: 'PDF',
          value: encryptValue
        }
      }
    }
  }
  var issuer= await getissuer();
  const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
  const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [vcJwt]
    }
  }
  
  const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer)
  Wallet.insertMany({userid: req.userId, document: vpJwt}, function (err,wallet) {
    //console.log('=====insertWallet========', wallet)
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
      // console.log(Wallet)
      const walletDid= Wallet[0].did;
      const did = await decryptString(req, res,"./private",walletDid);
      Wallet[0].did= did;
      res.status(200).send(Wallet);
    }
  })
};