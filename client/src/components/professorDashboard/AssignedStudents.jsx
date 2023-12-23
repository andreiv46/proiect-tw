import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";

const AssignedStudents = ({ className }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/professor/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setStudents(data.students || []);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className={className}>
      {students && students.length > 0 ? (
        students.map((student) => (
          <Card key={student.studentId} className="mb-4">
            <h1>Student id: {student.studentId}</h1>
            <p>Student name: {student.name}</p>
            <p>Student email: {student.email}</p>
            <p>Student major: {student.major}</p>
            <p>Student class: {student.studentClass}</p>
          </Card>
        ))
      ) : (
        <p>No students assigned to you.</p>
      )}
    </div>
  );
};

export default AssignedStudents;
