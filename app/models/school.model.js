const mongoose = require("mongoose");

const School = mongoose.model(
    "School",
    new mongoose.Schema({
        name: String,
        code: String,
        address: String,
        city: String,
        isActive: { type: Boolean, default: true },
        paymentCode: String,     
    },
    { timestamps: true})
);

module.exports = School;
