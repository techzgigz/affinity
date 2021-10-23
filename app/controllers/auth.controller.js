const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
// const Role = db.role;


const key = db.key;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const didJWT = require('did-jwt')
const signer = didJWT.ES256KSigner(process.env.SIGN)

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
    
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  
    .exec( async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      // var authorities = [];

      const keys= await key.find({ userid: user._id }).exec()
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        key:keys && keys[keys.length-1].public
      });
    });
};
