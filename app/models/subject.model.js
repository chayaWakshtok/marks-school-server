const mongoose = require("mongoose");

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        subjectName: String,
        numOfProjects: Number,
        trend:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trend"
        },
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        type: Number

    })
);

module.exports = Subject;
