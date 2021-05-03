const mongoose = require("mongoose");

const EvaluationStudentMark = mongoose.model(
    "EvaluationStudentMark",
    new mongoose.Schema({
        studentName: String,
        evaluations: [{
            evaluationName: String,
            levelName: String,
            numComment: Number,
            evaluationLevel: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EvaluationLevel"
            },
            evaluation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Evaluation"
            }
        }
        ],
        year: Number,
        type: Number,
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

module.exports = EvaluationStudentMark;
