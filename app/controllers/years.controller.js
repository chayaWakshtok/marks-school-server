const config = require("../config/auth.config");
const db = require("../models");
const StudyYear = db.studyYear;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Year content can not be empty"
        });
    }

    // Create a Note
    const studyYear = new StudyYear({
        name: req.body.name,
    });

    // Save Note in the database
    studyYear.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Year."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    StudyYear.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving years."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    StudyYear.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "year not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "year not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving year with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Year content can not be empty"
        });
    }

    // Find note and update it with the request body
    StudyYear.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Year not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Year not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating year with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    StudyYear.findByIdAndRemove(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Year not found with id " + req.params.id
                });
            }
            res.send({ message: "Year deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Year not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete year with id " + req.params.id
            });
        });
};
