const { authJwt } = require("../middlewares");
const controller = require("../controllers/trend.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/trend/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/trend/create", [authJwt.verifyToken], controller.create);
  app.get("/api/trend/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/trend/update", [authJwt.verifyToken], controller.update);
  app.get("/api/trend/delete", [authJwt.verifyToken], controller.delete);
  
};
