const mongoose = require("mongoose");

const MarkRange = mongoose.model(
  "MarkRange",
  new mongoose.Schema({
    minMark: Number,
    maxMark:Number,
    endMark:String,
    endingYear:Number,
    schoolRef:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    }
  })
);

module.exports = MarkRange;
