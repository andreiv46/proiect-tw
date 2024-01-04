import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

const FinalReq = ({ className }) => {
  const [finalRequests, setfinalRequests] = useState([]);
  const [showFileUploadOverlay, setShowFileUploadOverlay] = useState(false);
  const [selectedFinalRequestId, setSelectedFinalRequestId] = useState(null);

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

  // const handleAccept = (finalRequestId, e) => {
  //   e.preventDefault();
  //   fetch(`http://localhost:3000/final-request/accept/${finalRequestId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({ finalRequestId }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setfinalRequests(
  //         finalRequests.filter(
  //           (request) => request.finalRequestId !== finalRequestId
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // };

  const handleAccept = (finalRequestId, e) => {
    e.preventDefault();
    // Show file upload overlay
    setShowFileUploadOverlay(true);
    setSelectedFinalRequestId(finalRequestId);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cerere", e.target.files[0]);

    fetch(
      `http://localhost:3000/final-request/accept/${selectedFinalRequestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setfinalRequests(
          finalRequests.filter(
            (request) => request.finalRequestId !== selectedFinalRequestId
          )
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setShowFileUploadOverlay(false);
        setSelectedFinalRequestId(null);
      });
  };

  const handleReject = (finalRequestId, e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/final-request/reject/${finalRequestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ finalRequestId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setfinalRequests(
          finalRequests.filter(
            (request) => request.finalRequestId !== finalRequestId
          )
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDownloadPdf = (finalRequestId, e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/final-request/pdf/${finalRequestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `finalRequest${finalRequestId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <div className={className}>
      {finalRequests && finalRequests.length > 0 ? (
        finalRequests.map((finalRequest) => (
          <Card key={finalRequest.finalRequestId} className="mb-4">
            <h1>finalRequest id: {finalRequest.finalRequestId}</h1>
            <p>Professor Id: {finalRequest.professorId}</p>
            <p>Student Id: {finalRequest.studentId}</p>
            <div className="flex justify-around mt-2">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={(e) =>
                  handleDownloadPdf(finalRequest.finalRequestId, e)
                }
              >
                <img
                  src="/download-arrow-from-cloud-storage-svgrepo-com.svg"
                  alt="Student Icon"
                  className="h-4 w-4 opacity-60"
                />
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                type="button"
                onClick={(e) => handleAccept(finalRequest.finalRequestId, e)}
              >
                ACCEPT
              </Button>
              <Button
                type="button"
                onClick={(e) => handleReject(finalRequest.finalRequestId, e)}
              >
                REJECT
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p>No finalRequests assigned to you.</p>
      )}
      {showFileUploadOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                type="button"
                onClick={handleFileUpload}
              >
                UPLOAD FILE
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                type="button"
                onClick={() => setShowFileUploadOverlay(false)}
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

export default FinalReq;
