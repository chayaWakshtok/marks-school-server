const mongoose = require("mongoose");

const StudentMarkCategory = mongoose.model(
    "StudentMarkCategory",
    new mongoose.Schema({
        studentName: String,
        finishMark: Number,
        certMark:String,
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        year: Number,
        type: Number,
        marks: [
            {
                mark: Number,
                precent: Number,
                endMark: Number,
                categoryName: String,
                category:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category"
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
        comments: [{
            comment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            },
            name: String
        }]

    })
);

module.exports = StudentMarkCategory;
