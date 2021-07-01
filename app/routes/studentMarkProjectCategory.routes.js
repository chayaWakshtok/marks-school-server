const { authJwt } = require("../middlewares");
const controller = require("../controllers/studentMarkProjectCategory.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/StudentMarkProjectCategory/all", [authJwt.verifyToken], controller.findAll);
  app.get("/api/StudentMarkProjectCategory/byStudent", [authJwt.verifyToken], controller.findByStudent);
  app.get("/api/StudentMarkProjectCategory/findByStudentAllMarks", [authJwt.verifyToken], controller.findByStudentAllMarks);
  app.get("/api/StudentMarkProjectCategory/findByTypeSubjectClass", [authJwt.verifyToken], controller.findByTypeSubjectClass);
  app.post("/api/StudentMarkProjectCategory/create", [authJwt.verifyToken], controller.create);
  app.get("/api/StudentMarkProjectCategory/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/StudentMarkProjectCategory/update", [authJwt.verifyToken], controller.update);
  app.get("/api/StudentMarkProjectCategory/delete", [authJwt.verifyToken], controller.delete);

};
