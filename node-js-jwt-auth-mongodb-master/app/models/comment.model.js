const mongoose = require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        name: String,
        number:Number,
        positive:Boolean,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }
    })
);

module.exports = Comment;
