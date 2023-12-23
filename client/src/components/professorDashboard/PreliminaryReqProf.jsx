import { cn } from "../../../lib/utils.jsx";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { useState, useEffect } from "react";

const PreliminaryReqProf = ({ className }) => {
  const [preliminaryRequests, setPreliminaryRequests] = useState(null);

  const handleAccept = (preliminaryRequestId) => {
    fetch("http://localhost:3000/preliminary-request/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ preliminaryRequestId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPreliminaryRequests(
          preliminaryRequests.filter(
            (request) => request.preliminaryRequestId !== preliminaryRequestId
          )
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/preliminary-request/professor", {
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
    <div className={cn("", className)}>
      {preliminaryRequests && preliminaryRequests.length > 0 ? (
        preliminaryRequests.map((preliminaryRequest) => (
          <Card key={preliminaryRequest.preliminaryRequestId}>
            <div>
              <h1>
                Preliminary Request ID:{" "}
                {preliminaryRequest.preliminaryRequestId}
              </h1>
              <p>Student: {preliminaryRequest.studentId}</p>
              <p>Session Id: {preliminaryRequest.sessionId}</p>
              <p>Title: {preliminaryRequest.title}</p>
              <p>Description: {preliminaryRequest.description}</p>
              <p>Status: {preliminaryRequest.status}</p>
            </div>
            <div className="flex justify-around mt-2">
              <Button
                className="bg-green-500 hover:bg-green-600"
                type="button"
                onClick={(e) =>
                  handleAccept(preliminaryRequest.preliminaryRequestId)
                }
              >
                ACCEPT
              </Button>
              <Button type="button">REJECT</Button>
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

export default PreliminaryReqProf;
