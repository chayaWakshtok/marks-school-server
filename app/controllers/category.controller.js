const config = require("../config/auth.config");
const db = require("../models");
const Category = db.category;


// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const classScholl = new Category({
        name: req.body.name,
        schoolRef: req.schoolId,
        precent: req.body.precent,
        semel: req.body.semel,
        numTask: req.body.numTask,
        yearNumber: req.body.yearNumber,
        type: req.body.type,
        subject: req.body.subject,
        user: req.userId
    });

    // Save Note in the database
    classScholl.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Category.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Category."
            });
        });
};

exports.findAllBySubjectAndType = (req, res) => {
    Category.find({ "schoolRef": req.schoolId, "subject": req.query.subject, "type": req.query.type })
        .populate("studentMarkCategory").exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Category."
            });
        });
};

exports.findAllBySubjectAndTypeAndUser = (req, res) => {
    Category.find({ "schoolRef": req.schoolId, "subject": req.query.subject, "type": req.query.type,"user":req.userId })
        .populate("studentMarkCategory").exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Category."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Category.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Category with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Find note and update it with the request body
    Category.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        schoolRef: req.schoolId,
        precent: req.body.precent,
        semel: req.body.semel,
        numTask: req.body.numTask,
        yearNumber: req.body.yearNumber,
        type: req.body.type,
        subject: req.body.subject,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Category with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Category with id " + req.params.id
            });
        });
};
