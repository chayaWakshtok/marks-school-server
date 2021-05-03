const config = require("../config/auth.config");
const db = require("../models");
const EvaluationStudentMark = db.evaluationStudentMark;


// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const evaluationStudentMark = new EvaluationStudentMark({
        studentName: req.body.studentName,
        schoolRef: req.schoolId,
        student: req.body.student,
        type: req.body.type,
        year: req.body.year,
        evaluations: req.body.evaluations,

    });

    // Save Note in the database
    evaluationStudentMark.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the EvaluationStudentMark."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    EvaluationStudentMark.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EvaluationStudentMark."
            });
        });
};

exports.findByTypeAndStudent = (req, res) => {
    EvaluationStudentMark.findOne({ "schoolRef": req.schoolId, "student": req.query.student, "type": req.query.type })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EvaluationStudentMark."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    EvaluationStudentMark.findById(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "EvaluationStudentMark not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EvaluationStudentMark not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving EvaluationStudentMark with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    EvaluationStudentMark.findByIdAndUpdate(req.body._id, {
        studentName: req.body.studentName,
        student: req.body.student,
        type: req.body.type,
        year: req.body.year,
        evaluations: req.body.evaluations,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "EvaluationStudentMark not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EvaluationStudentMark not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating EvaluationStudentMark with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    EvaluationStudentMark.findByIdAndRemove(req.query.id)
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
