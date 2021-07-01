const config = require("../config/auth.config");
const db = require("../models");
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;


// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "User name can not be empty"
    });
  }

  pass = uuidv4();
  // Create 
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    tzId: req.body.tzId,
    password: bcrypt.hashSync(req.body.tzId, 8),
    schoolRef: req.schoolId,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    //send email with pass
    var mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'c0556777462@gmail.com',
        pass: '207322868'
      }
    });

    var mailOptions = {
      from: 'c0556777462@gmail.com',
      to: user.email,
      subject: 'הצטרפת בהצלחה לאתר בית הספר שלנו ',
      text: 'הצטרפת בהצלחה לאתר בית הספר שלנו סיסמתך: ' + pass,
    };

    mail.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    Role.findOne({ name: req.body.role }, (err, role) => {
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
        res.send({ message: "User was create successfully!" });
      });
    });
  });

};

exports.findAll = (req, res) => {
  User.find({ "schoolRef": req.schoolId })
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findByRole = (req, res) => {
  User.find({ "schoolRef": req.schoolId, "role": req.query.role })
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findAllRole = (req, res) => {
  Role.find()
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Roles."
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .populate("role")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
        id: user._id,
        name: user.name,
        tzId: user.tzId,
        email: user.email,
        role: user.role.name.toUpperCase(),
        phone: user.phone,
        schoolRef: user.schoolRef,
      });
    });
};




// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  // Find note and update it with the request body
  User.findByIdAndUpdate(req.query.id, {
    name: req.body.name,
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.id
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.query.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.id
      });
    });
};
