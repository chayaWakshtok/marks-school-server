const { authJwt } = require("../middlewares");
const controller = require("../controllers/evaluationStudentMark.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/evaluationStudentMark/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/evaluationStudentMark/create", [authJwt.verifyToken], controller.create);
  app.get("/api/evaluationStudentMark/find", [authJwt.verifyToken], controller.findOne);
  app.get("/api/evaluationStudentMark/findByTypeAndStudent", [authJwt.verifyToken], controller.findByTypeAndStudent);
  app.put("/api/evaluationStudentMark/update", [authJwt.verifyToken], controller.update);
  app.get("/api/evaluationStudentMark/delete", [authJwt.verifyToken], controller.delete);

};
