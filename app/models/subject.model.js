const mongoose = require("mongoose");

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        subjectName: String,
        numOfProjectsEnter: Number,
        numOfProjectsOutside: Number,
        numOfProjectsEnd: Number,
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
        type: Number,
        semel:String

    })
);

module.exports = Subject;
