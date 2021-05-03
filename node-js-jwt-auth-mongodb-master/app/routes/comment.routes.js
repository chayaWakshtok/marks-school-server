const { authJwt } = require("../middlewares");
const controller = require("../controllers/comment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/comment/all", [authJwt.verifyToken], controller.findAll);
  app.post("/api/comment/create", [authJwt.verifyToken], controller.create);
  app.get("/api/comment/find", [authJwt.verifyToken], controller.findOne);
  app.put("/api/comment/update", [authJwt.verifyToken], controller.update);
  app.get("/api/comment/delete", [authJwt.verifyToken], controller.delete);

};
