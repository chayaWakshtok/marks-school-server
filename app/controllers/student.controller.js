const config = require("../config/auth.config");
const db = require("../models");
const Student = db.student;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tz) {
        return res.status(400).send({
            message: "Trend name can not be empty"
        });
    }

    // Create 
    const student = new Student({
        firstName: req.body.firstName,
        tz: req.body.tz,
        lastName: req.body.lastName,
        schoolRef: req.schoolId,
        bornDate: req.body.bornDate,
        address: req.body.address,
        phone: req.body.phone,
        isActive: true,
        classSchool: req.body.classSchool,
        trend: req.body.trend,
    });

    student.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the student."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Student.find({ "schoolRef": req.schoolId })
        .populate("trend").populate("classSchool")
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Students."
            });
        });
};

exports.findByClass = (req, res) => {
    Student.find({ "schoolRef": req.schoolId, "classSchool": req.query.classSchool })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Students."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Student.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Student with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.tz) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findByIdAndUpdate(req.body._id, {
        firstName: req.body.firstName,
        tz: req.body.tz,
        lastName: req.body.lastName,
        bornDate: req.body.bornDate,
        address: req.body.address,
        phone: req.body.phone,
        classSchool: req.body.classSchool,
        trend: req.body.trend,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating student with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.id
                });
            }
            res.send({ message: "student deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete student with id " + req.params.id
            });
        });
};
