const config = require("../config/auth.config");
const db = require("../models");
const Trend = db.trend;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Trend name can not be empty"
        });
    }

    // Create a Note
    const trend = new Trend({
        name: req.body.name,
        schoolRef: req.schoolId
    });

    // Save Note in the database
    trend.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Trend."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Trend.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Trends."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Trend.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Trend not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Trend not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Trend with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Trend content can not be empty"
        });
    }

    // Find note and update it with the request body
    Trend.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Trend not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Trend not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Trend with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Trend.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Trend not found with id " + req.params.id
                });
            }
            res.send({ message: "Trend deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Trend not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Trend with id " + req.params.id
            });
        });
};
