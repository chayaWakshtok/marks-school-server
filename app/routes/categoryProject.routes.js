const { authJwt } = require("../middlewares");
const controller = require("../controllers/categoryProject.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/CategoryProject/all", [authJwt.verifyToken], controller.findAll);
  app.get("/api/CategoryProject/bySubjectAndType", [authJwt.verifyToken], controller.findAllBySubjectAndType);
  app.get("/api/CategoryProject/bySubjectAndTypeAndUser", [authJwt.verifyToken], controller.findAllBySubjectAndTypeAndUser);
  app.post("/api/CategoryProject/create", [authJwt.verifyToken], controller.create);
  app.get("/api/CategoryProject/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/CategoryProject/update", [authJwt.verifyToken], controller.update);
  app.get("/api/CategoryProject/delete", [authJwt.verifyToken], controller.delete);

};
