const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    className: String,
    startYear:Number,
    endingYear:Number,
    teacherRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    schoolRef:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    }
  })
);

module.exports = Class;
