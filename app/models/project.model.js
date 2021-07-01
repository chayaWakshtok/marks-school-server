const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        name: String,
        precent: Number,
        yearNumber: { type: Number, default: 0 },
        type: Number,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        subject:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        categoryProject:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CategoryProject"
            }, 
        ]
    })
);

module.exports = Project;

//type: 1-enter 2-outside 3-end
