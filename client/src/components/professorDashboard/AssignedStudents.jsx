import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";
import toast from "react-hot-toast";
import Button from "../ui/Button.jsx";

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

  const handleDownloadPdf = (studentId) => {
    fetch(
      `http://localhost:3000/professor/final-request/student/${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            toast.error(data.message || "Something went wrong");
            throw new Error(`HTTP error! status: ${res.status}`);
          });
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `finalRequest.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        toast.error("Error downloading PDF");
      });
  };

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
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={(e) => handleDownloadPdf(student.studentId)}
              >
                <img
                  src="/download-arrow-from-cloud-storage-svgrepo-com.svg"
                  alt="Student Icon"
                  className="h-4 w-4 opacity-60"
                />
              </Button>
            ) : (
              <p>Studentul nu are nicio cerere finala aprobata</p>
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
