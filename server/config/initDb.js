import Student from "../models/student.js";
import Professor from "../models/professor.js";
import PreliminaryRequest from "../models/preliminaryRequest.js";
import FinalRequest from "../models/finalRequest.js";
import EnrollmentSession from "../models/enrollmentSession.js";
import db from "./database.js";

Professor.hasMany(Student, { foreignKey: "assignedProfessorId" });
Student.belongsTo(Professor, { foreignKey: "assignedProfessorId" });

Professor.hasMany(EnrollmentSession, { foreignKey: "professorId" });
EnrollmentSession.belongsTo(Professor, { foreignKey: "professorId" });

EnrollmentSession.hasMany(PreliminaryRequest, { foreignKey: "sessionId" });
PreliminaryRequest.belongsTo(EnrollmentSession, { foreignKey: "sessionId" });

Student.hasMany(PreliminaryRequest, { foreignKey: "studentId" });
PreliminaryRequest.belongsTo(Student, { foreignKey: "studentId" });

Student.hasMany(FinalRequest, { foreignKey: "studentId" });
FinalRequest.belongsTo(Student, { foreignKey: "studentId" });

Professor.hasMany(FinalRequest, { foreignKey: "professorId" });
FinalRequest.belongsTo(Professor, { foreignKey: "professorId" });

db.sync({ force: true })
  .then(() => {
    console.log("Database and tables created!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
