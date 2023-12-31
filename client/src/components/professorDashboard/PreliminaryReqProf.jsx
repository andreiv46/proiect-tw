import { cn } from "../../../lib/utils.jsx";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { useState, useEffect } from "react";

const PreliminaryReqProf = ({ className }) => {
  const [preliminaryRequests, setPreliminaryRequests] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [justification, setJustification] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleAccept = (preliminaryRequestId, e) => {
    e.preventDefault();
    fetch("http://localhost:3000/preliminary-request/accept", {
      method: "PATCH",
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

  const handleReject = (preliminaryRequestId, e) => {
    e.preventDefault();
    setSelectedRequestId(preliminaryRequestId);
    setShowOverlay(true);
  };

  const handleRejectConfirm = (e) => {
    e.preventDefault();
    console.log(selectedRequestId, "yoooy");
    const preliminaryRequestId = selectedRequestId;
    fetch("http://localhost:3000/preliminary-request/reject", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        preliminaryRequestId: preliminaryRequestId,
        professorJustification: justification,
      }),
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
      })
      .finally(() => {
        setShowOverlay(false);
        setJustification("");
        setSelectedRequestId(null);
      });
  };

  const handleRejectCancel = (e) => {
    e.preventDefault();
    setShowOverlay(false);
    setJustification("");
    setSelectedRequestId(null);
  };

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
                  handleAccept(preliminaryRequest.preliminaryRequestId, e)
                }
              >
                ACCEPT
              </Button>
              <Button
                type="button"
                onClick={(e) =>
                  handleReject(preliminaryRequest.preliminaryRequestId, e)
                }
              >
                REJECT
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div className={className}>
          <h1>No preliminary requests</h1>
        </div>
      )}

      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <textarea
              className="w-full h-24 p-2 border rounded mb-4"
              placeholder="Enter justification..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
            <div className="flex justify-between">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                type="button"
                onClick={handleRejectConfirm}
              >
                CONFIRM REJECT
              </Button>
              <Button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                type="button"
                onClick={handleRejectCancel}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreliminaryReqProf;
