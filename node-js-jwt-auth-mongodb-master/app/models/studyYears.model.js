const mongoose = require("mongoose");

const StudyYear = mongoose.model(
  "StudyYears",
  new mongoose.Schema({
    name: String
  })
);

module.exports = StudyYear;
