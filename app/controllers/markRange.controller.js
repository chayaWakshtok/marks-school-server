const config = require("../config/auth.config");
const db = require("../models");
const MarkRange = db.markRange ;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.endMark) {
        return res.status(400).send({
            message: "endMark can not be empty"
        });
    }
    const markRange = new MarkRange({
        minMark: req.body.minMark,
        maxMark: req.body.maxMark,
        endMark: req.body.endMark,
        schoolRef: req.schoolId,
        endingYear: req.body.endingYear,
    });

    // Save Note in the database
    markRange.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the markRange."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    MarkRange.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving markRange."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    MarkRange.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "markRange not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "markRange not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving markRange with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.endMark) {
        return res.status(400).send({
            message: "endMark content can not be empty"
        });
    }

    // Find note and update it with the request body
    MarkRange.findByIdAndUpdate(req.body._id, {
        minMark: req.body.minMark,
        maxMark: req.body.maxMark,
        endMark: req.body.endMark,
        endingYear: req.body.endingYear,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "markRange not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "markRange not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating markRange with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    MarkRange.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "markRange not found with id " + req.params.id
                });
            }
            res.send({ message: "markRange deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "markRange not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete markRange with id " + req.params.id
            });
        });
};
