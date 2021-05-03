const { authJwt } = require("../middlewares");
const controller = require("../controllers/evaluation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/evaluation/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/evaluation/create", [authJwt.verifyToken], controller.create);
  app.get("/api/evaluation/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/evaluation/update", [authJwt.verifyToken], controller.update);
  app.get("/api/evaluation/delete", [authJwt.verifyToken], controller.delete);

};
