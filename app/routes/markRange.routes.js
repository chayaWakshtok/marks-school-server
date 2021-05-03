const { authJwt } = require("../middlewares");
const controller = require("../controllers/markRange.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/markRange/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/markRange/create", [authJwt.verifyToken], controller.create);
  app.get("/api/markRange/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/markRange/update", [authJwt.verifyToken], controller.update);
  app.get("/api/markRange/delete", [authJwt.verifyToken], controller.delete);

};
