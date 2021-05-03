const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const School = db.school;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//register first time
exports.signup = (req, res) => {

  const newSchool = new School(
    {
      name: req.body.school.name,
      code: req.body.school.code,
      address: req.body.school.address,
      city: req.body.school.city,
      paymentCode: req.body.paymentCode,
    }
  );

  newSchool.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      isActive: req.body.isActive,
      tzId: req.body.tzId,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      schoolRef: data._id,
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Role.findOne({ name: "manager" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.role = role._id;
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("role");
          res.send({ message: "School & Manager was registered successfully!" });
        });
      });
    });
  })
};

exports.signin = (req, res) => {
  User.findOne({
    tzId: req.body.tz
  })
    .populate("role")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, school: user.schoolRef }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        name: user.name,
        tzId: user.tzId,
        email: user.email,
        role: user.role.name.toUpperCase(),
        phone: user.phone,
        schoolRef: user.schoolRef,
        accessToken: token
      });
    });
};
