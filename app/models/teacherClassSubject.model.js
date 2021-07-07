const mongoose = require("mongoose");

const TeacherClassSubject = mongoose.model(
    "TeacherClassSubject",
    new mongoose.Schema({
        studyYear:Number,
        class:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        teacher:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        subject:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }

    })
);

module.exports = TeacherClassSubject;