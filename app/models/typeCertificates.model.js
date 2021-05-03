const mongoose = require("mongoose");

const TypeCertificates = mongoose.model(
    "TypeCertificates",
    new mongoose.Schema({
        type: String,
        schoolRef:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        }
    })
);

module.exports = TypeCertificates;
