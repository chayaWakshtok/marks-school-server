const config = require("../config/auth.config");
const db = require("../models");
const Project = db.project;


// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const project = new Project({
        name: req.body.name,
        schoolRef: req.schoolId,
        precent: req.body.precent,
        yearNumber: req.body.yearNumber,
        type: req.body.type,
        subject: req.body.subject
    });

    // Save Note in the database
    project.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Project."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Project.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Category."
            });
        });
};

exports.findAllBySubjectAndType = (req, res) => {
    Project.find({ "schoolRef": req.schoolId, "subject": req.query.subject, "type": req.query.type })
        .populate("studentMarkCategory").exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Project."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Project.findById(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Project with id " + req.params.id
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
    Project.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        schoolRef: req.schoolId,
        precent: req.body.precent,
        yearNumber: req.body.yearNumber,
        type: req.body.type,
        subject: req.body.subject
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Project not found with id " + req.body._id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Project not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Error updating Project with id " + req.body._id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.id
                });
            }
            res.send({ message: "Project deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Project with id " + req.params.id
            });
        });
};
