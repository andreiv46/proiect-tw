import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import Button from "../ui/Button.jsx";
import toast from "react-hot-toast";

const SignedRequest = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  console.log(user);

  useEffect(() => {
    if (user.requestFilePath) {
      console.log(user);
      fetch("http://localhost:3000/final-request/student", {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
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
          return res.blob();
        })
        .then((blob) => {
          console.log(blob);
          const url = URL.createObjectURL(blob);
          setFile(url);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [user]);

  return (
    <div>
      {user.requestFilePath ? (
        <div className="flex justify-center flex-col items-center bg-slate-400">
          <p className="mb-8">Profesorul a semnat cererea</p>
          <a href={file} download="signedRequest.pdf">
            <Button className="mb-4">DOWNLOAD</Button>
          </a>
        </div>
      ) : (
        <div>
          <p>Profesorul inca nu a semnat cererea</p>
        </div>
      )}
    </div>
  );
};

export default SignedRequest;
