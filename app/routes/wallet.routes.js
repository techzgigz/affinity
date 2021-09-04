const { authJwt } = require("../middlewares");
const controller = require("../controllers/wallet.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/wallet/all", [authJwt.verifyToken], controller.allWallet);

  app.post("/api/wallet/insert", [authJwt.verifyToken], controller.insertWallet);
};
