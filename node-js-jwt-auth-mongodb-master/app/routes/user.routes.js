const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { verifySignUp } = require("../middlewares");

//   app.get("/api/test/all", controller.allAccess);

//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isSecretary],
//     controller.moderatorBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
// };

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
  app.get("/api/user/findByRole", [authJwt.verifyToken, authJwt.isSecretaryOrAdmin], controller.findByRole);
  app.get("/api/user/role/all", [authJwt.verifyToken, authJwt.isSecretaryOrAdmin], controller.findAllRole);
  app.post("/api/user/create", [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.isSecretaryOrAdmin], controller.create);
  app.get("/api/user/find", [authJwt.verifyToken, authJwt.isSecretaryOrAdmin], controller.findOne);
  app.put("/api/user/update", [authJwt.verifyToken, authJwt.isSecretaryOrAdmin], controller.update);
  app.get("/api/user/delete", [authJwt.verifyToken, authJwt.isSecretaryOrAdmin], controller.delete);

};

