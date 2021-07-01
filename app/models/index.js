const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.category = require("./category.model");
db.class = require("./class.model");
db.comment = require("./comment.model");
db.evaluation = require("./evaluation.model");
db.evaluationLevel = require("./evaluationLevel.model");
db.markRange = require("./markRange.model");
db.role = require("./role.model");
db.school = require("./school.model");
db.student = require("./student.model");
db.studentMarkCategory = require("./studentMarkCategory.model");
db.studentMarkTask = require("./studentMarkTask.model");
db.studentMarkCertificate = require("./studentMarkTypeCertificate.model");
db.studyYear = require("./studyYears.model");
db.subject = require("./subject.model");
db.task = require("./task.model");
db.teacherClassSubject = require("./teacherClassSubject.model");
db.trend = require("./trend.model");
db.typeCertificate = require("./typeCertificates.model");
db.user = require("./user.model");
db.evaluationStudentMark=require("./evaluationStudentMark.model");
db.project=require("./project.model");
db.categoryProject=require("./categoryProject.model");
db.studentMarkProjectCategory=require("./studentMarkProjectCategory.model")
db.ROLES = ["teacher", "manager", "secretary", "bigmanager"];

module.exports = db;