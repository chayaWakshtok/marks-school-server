const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const path = require('path');
const fs = require('fs');

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const path1 = __dirname + '/app/views/';

app.use(express.static(path1));

const db = require("./app/models");
const Role = db.role;

//"mongodb+srv://marksSeminary:Chaya207322868!@cluster0.epv36.mongodb.net/marks-seminary?retryWrites=true&w=majority"
//"mongodb+srv://marksSeminary:<password>@cluster0.epv36.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // db.mongoose
  //   .connect("mongodb+srv://marksSeminary:Chaya207322868!@cluster0.epv36.mongodb.net/marks-seminary?retryWrites=true&w=majority", {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
    
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.sendFile(path1 + "index.html");
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/trend.routes")(app);
require("./app/routes/subject.routes")(app);
require("./app/routes/class.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/evaluation.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/evaluationLevel.routes")(app);
require("./app/routes/markRange.routes")(app);
require("./app/routes/teacherClassSubject.routes")(app);
require("./app/routes/typeCert.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/studentMarkCategory.routes")(app);
require("./app/routes/evaluationStudentMark.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/categoryProject.routes")(app);
require("./app/routes/studentMarkProjectCategory.routes")(app);
// require("./app/routes/year.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'manager' to roles collection");
      });

      new Role({
        name: "teacher"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'teacher' to roles collection");
      });

      new Role({
        name: "secretary"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'secretary' to roles collection");
      });

      new Role({
        name: "bigmanager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'bigmanager' to roles collection");
      });
    }
  });
}
