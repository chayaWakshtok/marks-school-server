const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/category/all", [authJwt.verifyToken], controller.findAll);
  app.get("/api/category/bySubjectAndType", [authJwt.verifyToken], controller.findAllBySubjectAndType);
  app.get("/api/category/bySubjectAndTypeAndUser", [authJwt.verifyToken], controller.findAllBySubjectAndTypeAndUser);
  app.post("/api/category/create", [authJwt.verifyToken], controller.create);
  app.get("/api/category/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/category/update", [authJwt.verifyToken], controller.update);
  app.get("/api/category/delete", [authJwt.verifyToken], controller.delete);

};
