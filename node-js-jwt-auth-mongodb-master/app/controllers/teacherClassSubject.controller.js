const config = require("../config/auth.config");
const db = require("../models");
const TeacherClassSubject = db.teacherClassSubject;


// Create and Save a new Note
exports.create = (req, res) => {

    // Create 
    const teacherClassSubject = new TeacherClassSubject({
        class: req.body.class,
        schoolRef: req.schoolId,
        teacher: req.body.teacher,
        subject: req.body.subject,
        studyYear: req.body.studyYear
    });

    // Save Note in the database
    teacherClassSubject.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the teacherClassSubject."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    TeacherClassSubject.find({ "schoolRef": req.schoolId })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Classes."
            });
        });
};

exports.findByTeacher = (req, res) => {
    TeacherClassSubject.find({ "teacher": req.userId }).populate("subject").populate('class').exec()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving TeacherClassSubject."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    TeacherClassSubject.findById(req.params.id)
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
    // if (!req.body.className) {
    //     return res.status(400).send({
    //         message: "Class content can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    TeacherClassSubject.findByIdAndUpdate(req.body._id, {
        class: req.body.class,
        subject: req.body.subject,
        studyYear: req.body.studyYear
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "TeacherClassSubject not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "TeacherClassSubject not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating TeacherClassSubject with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    TeacherClassSubject.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "TeacherClassSubject not found with id " + req.params.id
                });
            }
            res.send({ message: "TeacherClassSubject deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "TeacherClassSubject not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete TeacherClassSubject with id " + req.params.id
            });
        });
};
