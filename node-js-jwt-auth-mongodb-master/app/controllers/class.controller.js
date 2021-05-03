const config = require("../config/auth.config");
const db = require("../models");
const Class = db.class;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.className) {
        return res.status(400).send({
            message: "Class name can not be empty"
        });
    }

    // Create a Note
    const classScholl = new Class({
        className: req.body.className,
        schoolRef: req.schoolId,
        endingYear: req.body.endingYear,
        teacherRef: req.body.teacherRef,
    });

    // Save Note in the database
    classScholl.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Class."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Class.find({ "schoolRef": req.schoolId }).populate('teacherRef').exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Classes."
            });
        });
};

exports.findByTeacher = (req, res) => {
    Class.find({ "schoolRef": req.schoolId,"teacherRef": req.userId})
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Classes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Class.findById(req.query.id).populate('teacherRef').exec()
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
    // Validate Request
    if (!req.body.className) {
        return res.status(400).send({
            message: "Class content can not be empty"
        });
    }

    // Find note and update it with the request body
    Class.findByIdAndUpdate(req.body._id, {
        className: req.body.className,
        endingYear: req.body.endingYear,
        teacherRef: req.body.teacherRef,
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
    Class.findByIdAndRemove(req.query.id)
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
