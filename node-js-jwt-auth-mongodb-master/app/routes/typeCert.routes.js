const { authJwt } = require("../middlewares");
const controller = require("../controllers/typeCert.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/typeCert/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/typeCert/create", [authJwt.verifyToken], controller.create);
  app.get("/api/typeCert/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/typeCert/update", [authJwt.verifyToken], controller.update);
  app.get("/api/typeCert/delete", [authJwt.verifyToken], controller.delete);

};
