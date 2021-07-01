const mongoose = require("mongoose");

const StudentMarkProjectCategory = mongoose.model(
    "StudentMarkProjectCategory",
    new mongoose.Schema({
        studentName: String,
        finishMark: Number,//ציון סופי לפרויקט
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        classSchool: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        certMark: Number,
        year: Number,
        type: Number,
        marks: [
            {
                mark: Number,
                precent: Number,
                endMark: Number,
                categoryName: String,
                CategoryProject:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "CategoryProject"
                },
            }
        ],
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        student:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },

    })
);

module.exports = StudentMarkProjectCategory;
