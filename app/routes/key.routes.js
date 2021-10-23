const { authJwt } = require("../middlewares");
const controller = require("../controllers/key.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/key/all", [authJwt.verifyToken], controller.allKey);

  app.post("/api/key/insert", [authJwt.verifyToken], controller.insertKey);

};
