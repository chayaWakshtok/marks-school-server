const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        name: String,
        precent: Number,
        semel: Number,
        numTask: { type: Number, default: 1 },
        yearNumber: { type: Number, default: 0 },
        type: Number,
        user:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
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
        studentMarkCategory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "StudentMarkCategory"
            }
        ]
    })
);

module.exports = Category;
