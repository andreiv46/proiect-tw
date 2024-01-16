import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";
import toast from "react-hot-toast";

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
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            toast.error(data.message || "Something went wrong");
            throw new Error(`HTTP error! status: ${res.status}`);
          });
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
            {student.requestFilePath ? (
              <p>Student has uploaded the final request</p>
            ) : (
              <p>Student has not uploaded a request.</p>
            )}
          </Card>
        ))
      ) : (
        <p>No students assigned to you.</p>
      )}
    </div>
  );
};

export default AssignedStudents;
