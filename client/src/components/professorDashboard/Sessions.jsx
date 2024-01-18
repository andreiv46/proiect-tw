import { useEffect, useState } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { formatDate } from "../../../lib/utils.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const Sessions = ({ className }) => {
  const [sessions, setSessions] = useState(null);
  const [created, setCreated] = useState(false);
  const [studentLimit, setStudentLimit] = useState(0);
  const [endTime, setEndTime] = useState(new Date());
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/enrollment/sessions/active", {
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
        setSessions(data.activeEnrollmentSessions || []);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [created]);

  const handleCreateSessionCancel = () => {
    setEndTime(new Date());
    setStudentLimit(0);
    setShowOverlay(false);
  };

  const handleCreateSession = () => {
    fetch("http://localhost:3000/enrollment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        endTime: endTime,
        studentsLimit: studentLimit,
      }),
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
        toast.success(data.message);
        setCreated(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setEndTime(new Date());
        setStudentLimit(0);
        setShowOverlay(false);
      });
  };

  return (
    <div>
      <div className="flex justify-center pb-4 mb-8 flex-col items-center">
        <Button className="" onClick={() => setShowOverlay(true)}>
          CREATE SESSION
        </Button>
      </div>
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
          <div>
            <h1>No sessions</h1>
          </div>
        )}
        {showOverlay && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-200 p-8 rounded shadow-md w-96">
              <p className="mb-4 text-red-700">
                Sesiunea de înregistrare va începe în momentul creării.
              </p>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                Introduceti perioada
              </label>
              <DatePicker
                id="endTime"
                showIcon
                minDate={new Date()}
                selected={endTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                onChange={(date) => setEndTime(date)}
                dateFormat={"dd/MM/yyyy"}
              ></DatePicker>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mt-1"
              >
                Introduceti numarul de studenti
              </label>
              <input
                type="number"
                min="1"
                max="30"
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter student limit..."
                value={studentLimit}
                onChange={(e) => setStudentLimit(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  type="button"
                  onClick={handleCreateSession}
                >
                  CONFIRM
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                  type="button"
                  onClick={handleCreateSessionCancel}
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
