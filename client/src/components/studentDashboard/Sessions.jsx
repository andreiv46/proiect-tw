import { useEffect, useState } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { formatDate } from "../../../lib/utils.jsx";

const Sessions = ({ className }) => {
  const [sessions, setSessions] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/enrollment/sessions/active", {
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
        setSessions(data.activeEnrollmentSessions || []);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleEnroll = (sessionId, e) => {
    e.preventDefault();
    setSelectedSessionId(sessionId);
    setShowOverlay(true);
  };

  const handleEnrollConfirm = (e) => {
    e.preventDefault();

    console.log(selectedSessionId, title, description);

    fetch("http://localhost:3000/preliminary-request/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        sessionId: selectedSessionId,
        title: title,
        description: description,
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
        console.log(data.message);
        setShowOverlay(false);
        setTitle("");
        setDescription("");
        setSelectedSessionId(null);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        console.log(error.message);
        setShowOverlay(false);
      });
  };

  const handleEnrollCancel = (e) => {
    e.preventDefault();
    setShowOverlay(false);
    setTitle("");
    setDescription("");
    setSelectedSessionId(null);
  };

  return (
    <div className={className}>
      {sessions && sessions.length > 0 ? (
        sessions.map((session) => (
          <div key={session.sessionId}>
            <Card>
              <div>
                <h1>Session ID: {session.sessionId}</h1>
                <p>Professor: {session.professorName}</p>
                <p>Start Time: {formatDate(session.startTime)}</p>
                <p>End Time: {formatDate(session.endTime)}</p>
                <p>Enrolled Students: {session.enrolledStudents}</p>
                <p>Students Limit: {session.studentsLimit}</p>
              </div>
              <Button onClick={(e) => handleEnroll(session.sessionId, e)}>
                ENROLL
              </Button>
            </Card>
          </div>
        ))
      ) : (
        <div className={className}>
          <h1>No sessions</h1>
        </div>
      )}

      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <input
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full h-24 p-2 border rounded mb-4"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-between">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                type="button"
                onClick={handleEnrollConfirm}
              >
                CONFIRM ENROLL
              </Button>
              <Button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                type="button"
                onClick={handleEnrollCancel}
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

export default Sessions;
