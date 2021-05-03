const config = require("../config/auth.config");
const db = require("../models");
const Evaluation = db.evaluation;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Evaluation name can not be empty"
        });
    }

    // Create a Note
    const evaluation = new Evaluation({
        name: req.body.name,
        schoolRef: req.schoolId,
    });

    // Save Note in the database
    evaluation.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Evaluation."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Evaluation.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Evaluations."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Evaluation.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Evaluation not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Evaluation not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Evaluation with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Evaluation content can not be empty"
        });
    }

    // Find note and update it with the request body
    Evaluation.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Evaluation not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Evaluation not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Evaluation with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Evaluation.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Evaluation not found with id " + req.params.id
                });
            }
            res.send({ message: "Evaluation deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Evaluation not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Evaluation with id " + req.params.id
            });
        });
};
