const mongoose = require("mongoose");

const StudentMarkTypeCertificate = mongoose.model(
    "StudentMarkTypeCertificate",
    new mongoose.Schema({
        endMark:Number,
        year:Number,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        typeCertificates:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TypeCertificates"
        },
        student:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }

    })
);

module.exports = StudentMarkTypeCertificate;
