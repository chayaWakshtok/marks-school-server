const mongoose = require("mongoose");
const { stringify } = require("uuid");

const Student = mongoose.model(
    "Student",
    new mongoose.Schema({
        firstName: String,
        tz: String,
        lastName: String,
        bornDate: Date,
        address: String,
        phone: String,

        isActive: { type: Boolean, default: true },
        classSchool:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        trend:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trend"
        },
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }
    },
        { timestamps: true })
);

module.exports = Student;
