const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tzId: String,
    phone: String,
    isActive: Boolean,
    schoolRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    },
    role:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    },
  },
    { timestamps: true })
);

module.exports = User;
