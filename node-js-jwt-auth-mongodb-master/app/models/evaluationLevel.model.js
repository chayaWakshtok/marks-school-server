const mongoose = require("mongoose");

const EvaluationLevel = mongoose.model(
    "EvaluationLevel",
    new mongoose.Schema({
        numCommentStart: Number,
        numCommentEnd: Number,
        remark: String,
        year: Number,
        evaluation:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Evaluation"
        },
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }
    },
        { timestamps: true })
);

module.exports = EvaluationLevel;
