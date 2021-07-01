const mongoose = require("mongoose");

const CategoryProject = mongoose.model(
    "CategoryProject",
    new mongoose.Schema({
        name: String,
        precent: Number,
        semel: Number,
        numTask: { type: Number, default: 1 },
        yearNumber: { type: Number, default: 0 },
        type: Number,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        project:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        StudentMarkProjectCategory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "StudentMarkProjectCategory"
            }
        ]
    })
);

module.exports = CategoryProject;
