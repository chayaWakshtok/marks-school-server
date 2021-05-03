const { authJwt } = require("../middlewares");
const controller = require("../controllers/evaluationLevel.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/evaluationLevel/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/evaluationLevel/create", [authJwt.verifyToken], controller.create);
  app.get("/api/evaluationLevel/find", [authJwt.verifyToken], controller.findOne);
  app.post("/api/evaluationLevel/findByEvaluationList", [authJwt.verifyToken], controller.findByEvaluationList);
  app.put("/api/evaluationLevel/update", [authJwt.verifyToken], controller.update);
  app.get("/api/evaluationLevel/delete", [authJwt.verifyToken], controller.delete);

};
