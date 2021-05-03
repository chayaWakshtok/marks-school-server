const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

const Category = db.category;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    // name: String,
    // precent: Number,
    // semel: Number,
    // numTask: { type: Number, default: 1 },
    // yearNumber: { type: Number, default: 0 },
    // type:
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "TypeCertificates"
    // },
    // schoolRef:
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "School"
    // },
    // subject:
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subject"
    // }
    new Category({
        name:"ממוצע ציוני מבחנים",
        precent:70,
        semel:333,
        yearNumber:1,
        type:db.mongoose.Types.ObjectId("60873fda6f8bf082bc8015ce"),
        subject:db.mongoose.Types.ObjectId("608543766cc7e2b3841c89fb"),
        schoolRef:db.mongoose.Types.ObjectId("6053577f4e3d4f6de4a75305")
    }).save(err => {
        if (err) {
            console.log("error", err);
        }

        console.log("added 1");
    });
    new Category({
        name:"עבודות /בחנים / שעורי בית",
        precent:15,
        semel:333,
        yearNumber:1,
        type:db.mongoose.Types.ObjectId("60873fda6f8bf082bc8015ce"),
        subject:db.mongoose.Types.ObjectId("608543766cc7e2b3841c89fb"),
        schoolRef:db.mongoose.Types.ObjectId("6053577f4e3d4f6de4a75305")
    }).save(err => {
        if (err) {
            console.log("error", err);
        }

        console.log("added 1");
    });
    new Category({
        name:"תלמידאות",
        precent:15,
        semel:333,
        yearNumber:1,
        type:db.mongoose.Types.ObjectId("60873fda6f8bf082bc8015ce"),
        subject:db.mongoose.Types.ObjectId("608543766cc7e2b3841c89fb"),
        schoolRef:db.mongoose.Types.ObjectId("6053577f4e3d4f6de4a75305")
    }).save(err => {
        if (err) {
            console.log("error", err);
        }

        console.log("added 1");
    })

}
