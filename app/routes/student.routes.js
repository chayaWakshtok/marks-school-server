const { authJwt } = require("../middlewares");
const controller = require("../controllers/student.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/student/all", [authJwt.verifyToken], controller.findAll);
  app.get("/api/student/findByClass", [authJwt.verifyToken], controller.findByClass);
  app.post("/api/student/create", [authJwt.verifyToken], controller.create);
  app.get("/api/student/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/student/update", [authJwt.verifyToken], controller.update);
  app.get("/api/student/delete", [authJwt.verifyToken], controller.delete);
  
};
