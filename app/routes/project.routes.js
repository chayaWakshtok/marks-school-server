const { authJwt } = require("../middlewares");
const controller = require("../controllers/project.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/project/all", [authJwt.verifyToken], controller.findAll);
  app.get("/api/project/bySubjectAndType", [authJwt.verifyToken], controller.findAllBySubjectAndType);
  app.post("/api/project/create", [authJwt.verifyToken], controller.create);
  app.get("/api/project/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/project/update", [authJwt.verifyToken], controller.update);
  app.get("/api/project/delete", [authJwt.verifyToken], controller.delete);

};
