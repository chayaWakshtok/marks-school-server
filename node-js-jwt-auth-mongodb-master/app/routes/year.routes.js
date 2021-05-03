const { authJwt } = require("../middlewares");
const controller = require("../controllers/years.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/studyYears/studyYearsList", [authJwt.verifyToken], controller.findAll);

  app.post("/studyYears/AddStudyYears", [authJwt.verifyToken], controller.create);

  app.post("/studyYears/UpdateStudyYears", [authJwt.verifyToken], controller.update);

  app.get("/studyYears/deleteStudyYears/id", [authJwt.verifyToken], controller.delete);

};