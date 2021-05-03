const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.schoolId = decoded.school;
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(
      user.role).exec(
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (role.name === "manager") {
            next();
            return;
          }
          res.status(403).send({ message: "Require Manager Role!" });
          return;
        }
      );
  });
};

isBigAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(
      user.role).exec(
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (role.name === "bigmanager") {
            next();
            return;
          }
          res.status(403).send({ message: "Require BigManager Role!" });
          return;
        }
      );
  });
};

isSecretary = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(
      user.role).exec(
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (role.name === "secretary") {
            next();
            return;
          }
          res.status(403).send({ message: "Require Secretary Role!" });
          return;
        }
      );
  });
};

isSecretaryOrAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(
      user.role).exec(
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (role.name === "secretary" || role.name === 'manager') {
            next();
            return;
          }
          res.status(403).send({ message: "Require Secretary or Manager Role!" });
          return;
        }
      );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSecretary,
  isSecretaryOrAdmin
};
module.exports = authJwt;
