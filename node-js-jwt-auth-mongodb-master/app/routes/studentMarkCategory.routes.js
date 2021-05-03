const { authJwt } = require("../middlewares");
const controller = require("../controllers/studentMarkCategory.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/studentMarkCategory/all", [authJwt.verifyToken], controller.findAll);
  app.get("/api/studentMarkCategory/byStudent", [authJwt.verifyToken], controller.findByStudent);
  app.post("/api/studentMarkCategory/create", [authJwt.verifyToken], controller.create);
  app.get("/api/studentMarkCategory/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/studentMarkCategory/update", [authJwt.verifyToken], controller.update);
  app.get("/api/studentMarkCategory/delete", [authJwt.verifyToken], controller.delete);

};
