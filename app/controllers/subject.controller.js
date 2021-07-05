const config = require("../config/auth.config");
const db = require("../models");
const Subject = db.subject;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.subjectName) {
        return res.status(400).send({
            message: "Subject name can not be empty"
        });
    }

    // Create a Note
    const sub = new Subject({
        subjectName: req.body.subjectName,
        numOfProjectsEnter: req.body.numOfProjectsEnter,
        numOfProjectsOutside: req.body.numOfProjectsOutside,
        numOfProjectsEnd: req.body.numOfProjectsEnd,
        trend: req.body.trendRef,
        schoolRef: req.schoolId,
        type: req.body.type,
        semel: req.body.semel
    });

    // Save Note in the database
    sub.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Subject."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Subject.find({ "schoolRef": req.schoolId })
        .populate("trend")
        .exec((err, sub) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Subjects."
                });
            };
            res.send(sub);
        })
};



// Find a single note with a noteId
exports.findOne = (req, res) => {
    Subject.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Subject with id " + req.params.id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.subjectName) {
        return res.status(400).send({
            message: "Subject content can not be empty"
        });
    }

    // Find note and update it with the request body
    Subject.findByIdAndUpdate(req.body._id, {
        subjectName: req.body.subjectName,
        numOfProjectsEnter: req.body.numOfProjectsEnter,
        numOfProjectsOutside: req.body.numOfProjectsOutside,
        numOfProjectsEnd: req.body.numOfProjectsEnd,
        trend: req.body.trendRef,
        type: req.body.type,
        semel: req.body.semel
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Subject with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Subject.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            res.send({ message: "Subject deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Subject with id " + req.params.id
            });
        });
};
