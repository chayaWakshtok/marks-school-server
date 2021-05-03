const mongoose = require("mongoose");

const Evaluation = mongoose.model(
    "Evaluation",
    new mongoose.Schema({
        name: String,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }
    })
);

module.exports = Evaluation;
