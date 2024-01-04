import { useState } from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

const RequestUploader = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("cerere", file);
    fetch("http://localhost:3000/final-request/student", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center bg-slate-300 shadow-md rounded-lg p-8">
      <div className="flex justify-center items-center w-full max-w-md">
        <Input type="file" onChange={handleFileChange} className="mb-4" />
      </div>
      <div className="mt-7">
        <Button onClick={handleSubmit}>Incarca cererea</Button>
      </div>
    </div>
  );
};

export default RequestUploader;
