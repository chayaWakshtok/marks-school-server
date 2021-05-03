const config = require("../config/auth.config");
const db = require("../models");
const TypeCert = db.typeCertificate;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        return res.status(400).send({
            message: "type can not be empty"
        });
    }

    // Create a Note
    const classScholl = new TypeCert({
        type: req.body.type,
        schoolRef: req.schoolId,
    });

    // Save Note in the database
    classScholl.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the type."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    TypeCert.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving types."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    TypeCert.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving type with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.type) {
        return res.status(400).send({
            message: "type content can not be empty"
        });
    }

    // Find note and update it with the request body
    TypeCert.findByIdAndUpdate(req.query.id, {
        type: req.body.type,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating type with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    TypeCert.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            res.send({ message: "type deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete type with id " + req.params.id
            });
        });
};
