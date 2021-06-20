const config = require("../config/auth.config");
const db = require("../models");
const StudentMarkCategory = db.studentMarkCategory;



// Create and Save a new Note
exports.create = (req, res) => {
    // Validate reques

    // Create a Note
    const classScholl = new StudentMarkCategory({
        studentName: req.body.studentName,
        finishMark: req.body.finishMark,
        subject: req.body.subject,
        year: req.body.year,
        type: req.body.type,
        schoolRef: req.schoolId,
        marks: req.body.marks,
        student: req.body.student,
        comments: req.body.comments,
        certMark:req.body.certMark
    });

    // Save Note in the database
    classScholl.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    StudentMarkCategory.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
//TODO: year =2021
exports.findByStudent = (req, res) => {
    StudentMarkCategory.findOne({ "schoolRef": req.schoolId, "student": req.query.student, "subject": req.query.subject, "type": req.query.type })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findByStudentAllMarks = (req, res) => {
    StudentMarkCategory.find({ "schoolRef": req.schoolId, "student": req.query.student, "type": req.query.type })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    StudentMarkCategory.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Class not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Class not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Class with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    StudentMarkCategory.findByIdAndUpdate(req.body._id, {
        studentName: req.body.studentName,
        finishMark: req.body.finishMark,
        subject: req.body.subject,
        year: req.body.year,
        type: req.body.type,
        marks: req.body.marks,
        student: req.body.student,
        comments: req.body.comments,
        certMark:req.body.certMark
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Class not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Class not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Class with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    StudentMarkCategory.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Class not found with id " + req.params.id
                });
            }
            res.send({ message: "Class deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Class not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Class with id " + req.params.id
            });
        });
};
