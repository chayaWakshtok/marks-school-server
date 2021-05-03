const config = require("../config/auth.config");
const db = require("../models");
const Comment = db.comment;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Comment name can not be empty"
        });
    }

    // Create a Note
    const comment = new Comment({
        name: req.body.name,
        schoolRef: req.schoolId,
        number: req.body.number,
        positive:req.body.positive
    });

    // Save Note in the database
    comment.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Comment."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Comment.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Comment."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Comment.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Comment not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Comment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Comment with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // Find note and update it with the request body
    Comment.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        number: req.body.number,
        positive:req.body.positive
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Comment not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Comment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Comment with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Comment not found with id " + req.params.id
                });
            }
            res.send({ message: "Comment deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Comment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Comment with id " + req.params.id
            });
        });
};
