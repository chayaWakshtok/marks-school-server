const mongoose = require("mongoose");

const StudentMarkTask = mongoose.model(
    "StudentMarkTask",
    new mongoose.Schema({
        mark: Number,
        endMark:Number,
        year:Number,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        task:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        },
        category:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        student:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }

    })
);

module.exports = StudentMarkTask;
