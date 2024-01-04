import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";

const PreliminaryReqStud = ({ className }) => {
  const [preliminaryRequests, setPreliminaryRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/preliminary-request/student", {
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
        setPreliminaryRequests(data.preliminaryRequests || []);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className={className}>
      {preliminaryRequests && preliminaryRequests.length > 0 ? (
        [...preliminaryRequests]
          .sort((a, b) => (a.status === "rejected" ? 1 : -1))
          .map((preliminaryRequest) => (
            <Card key={preliminaryRequest.preliminaryRequestId}>
              <div>
                <h1>
                  Preliminary Request ID:{" "}
                  {preliminaryRequest.preliminaryRequestId}
                </h1>
                <p>Session Id: {preliminaryRequest.sessionId}</p>
                <p>Title: {preliminaryRequest.title}</p>
                <p>Description: {preliminaryRequest.description}</p>
                <p>
                  Status:{" "}
                  <span
                    className={
                      preliminaryRequest.status === "rejected"
                        ? "text-red-800"
                        : ""
                    }
                  >
                    {preliminaryRequest.status}
                  </span>
                </p>
                {preliminaryRequest.status === "rejected" && (
                  <p>
                    Justification: {preliminaryRequest.professorJustification}
                  </p>
                )}
              </div>
            </Card>
          ))
      ) : (
        <div className={className}>
          <h1>No preliminary requests</h1>
        </div>
      )}
    </div>
  );
};
export default PreliminaryReqStud;
