const { authJwt } = require("../middlewares");
const controller = require("../controllers/subject.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/subject/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/subject/create", [authJwt.verifyToken], controller.create);
  app.get("/api/subject/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/subject/update", [authJwt.verifyToken], controller.update);
  app.get("/api/subject/delete", [authJwt.verifyToken], controller.delete);
  app.get("/api/subject/getByTeacher", [authJwt.verifyToken], controller.delete);
};
