const { authJwt } = require("../middlewares");
const controller = require("../controllers/class.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/class/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/class/create", [authJwt.verifyToken], controller.create);
  app.get("/api/class/find", [authJwt.verifyToken], controller.findOne);
  app.get("/api/class/findByTeacher", [authJwt.verifyToken], controller.findByTeacher);
  app.put("/api/class/update", [authJwt.verifyToken], controller.update);
  app.get("/api/class/delete", [authJwt.verifyToken], controller.delete);

};
