const mongoose = require("mongoose");

const Trend = mongoose.model(
  "Trend",
  new mongoose.Schema({
    name: String,
    schoolRef:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    }
  })
);

module.exports = Trend;
