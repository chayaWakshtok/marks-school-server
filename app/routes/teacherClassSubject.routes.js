const { authJwt } = require("../middlewares");
const controller = require("../controllers/teacherClassSubject.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/teacherClassSubject/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/teacherClassSubject/create", [authJwt.verifyToken], controller.create);
  app.get("/api/teacherClassSubject/find", [authJwt.verifyToken], controller.findOne);
  app.get("/api/teacherClassSubject/findByTeacher", [authJwt.verifyToken], controller.findByTeacher);
  app.put("/api/teacherClassSubject/update", [authJwt.verifyToken], controller.update);
  app.get("/api/teacherClassSubject/delete", [authJwt.verifyToken], controller.delete);

};
