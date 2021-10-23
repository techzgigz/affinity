const { authJwt } = require("../middlewares");
const controller = require("../controllers/wallet.controller");

const pdf2base64 = require('pdf-to-base64');

module.exports = function (app, upload) {
  app.use(function (req, res, next) {
    // console.log('=================')
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  uploads = (req, res, next) => {
    
    upload(req, res,function (err) {
      if (err) {
        console.log('=======uploads==========',err)
        return res.status(500).json(err)
      } 
      // console.log('upload\\1633979143208-PATTERN 02.pdf')
      // console.log(req.file.path)
      //next()
      pdf2base64(req.file.path)
      .then(
          (response) => {
            // console.log(response)
             req.body.did= response.substring(1, 100) ;
             next()//cGF0aC90by9maWxlLmpwZw==
          }
      )
      .catch(
          (error) => {
              console.log(error); //Exepection error....
          }
      )

     })
  }

  app.post("/api/wallet/all", [authJwt.verifyToken], controller.allWallet);

  app.post("/api/wallet/insert", [authJwt.verifyToken], uploads, controller.insertWallet);

  app.post("/api/walletID", [authJwt.verifyToken], controller.getByIDWallet);

};
