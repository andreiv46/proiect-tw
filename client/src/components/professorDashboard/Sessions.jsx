import { useEffect, useState } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { formatDate } from "../../../lib/utils.jsx";

const Sessions = ({ className }) => {
  const [sessions, setSessions] = useState(null);
  const [created, setCreated] = useState(false);

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
  }, [created]);

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
            </Card>
          </div>
        ))
      ) : (
        <div className={className}>
          <h1>No sessions</h1>
          <Button onClick={() => setCreated(true)}>CREATE SESSION</Button>
        </div>
      )}
    </div>
  );
};

export default Sessions;
