const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        name: String,
        precent: Number,
        category:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }

    })
);

module.exports = Task;
