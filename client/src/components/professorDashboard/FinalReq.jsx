import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";

const FinalReq = ({ className }) => {
  const [finalRequests, setfinalRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/final-request/professor", {
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
        setfinalRequests(data.finalRequests || []);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className={className}>
      {finalRequests && finalRequests.length > 0 ? (
        finalRequests.map((finalRequest) => (
          <Card key={finalRequest.finalRequestId} className="mb-4">
            <h1>finalRequest id: {finalRequest.finalRequestId}</h1>
            <p>Professor Id: {finalRequest.professorId}</p>
            <p>Student Id: {finalRequest.studentId}</p>
            <p>Student file path: {finalRequest.studentFilePath}</p>
          </Card>
        ))
      ) : (
        <p>No finalRequests assigned to you.</p>
      )}
    </div>
  );
};

export default FinalReq;
