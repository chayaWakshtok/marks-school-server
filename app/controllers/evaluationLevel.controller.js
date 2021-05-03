const config = require("../config/auth.config");
const db = require("../models");
const EvaluationLevel = db.evaluationLevel;

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const evaluation = new EvaluationLevel({
        numCommentStart: req.body.numCommentStart,
        numCommentEnd: req.body.numCommentEnd,
        remark: req.body.remark,
        year: req.body.year,
        evaluation: req.body.evaluation,
        schoolRef: req.schoolId,
    });

    // Save Note in the database
    evaluation.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the EvaluationLevel."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    EvaluationLevel.find({ "schoolRef": req.schoolId }).populate("evaluation").exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EvaluationLevel."
            });
        });
};

exports.findByEvaluationList = (req, res) => {
    EvaluationLevel.find({ "schoolRef": req.schoolId, "evaluation.name": { $in: [req.body.list] } }).populate("evaluation").exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EvaluationLevel."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    EvaluationLevel.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "EvaluationLevel not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EvaluationLevel not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving EvaluationLevel with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request

    EvaluationLevel.findByIdAndUpdate(req.body._id, {
        numCommentStart: req.body.numCommentStart,
        numCommentEnd: req.body.numCommentEnd,
        remark: req.body.remark,
        year: req.body.year,
        evaluation: req.body.evaluation,
        schoolRef: req.schoolId,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "EvaluationLevel not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EvaluationLevel not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating EvaluationLevel with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    EvaluationLevel.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "EvaluationLevel not found with id " + req.params.id
                });
            }
            res.send({ message: "EvaluationLevel deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "EvaluationLevel not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete EvaluationLevel with id " + req.params.id
            });
        });
};
