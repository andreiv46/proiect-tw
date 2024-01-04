import { Tab, Tabs } from "../../components/ui/Tabs.jsx";
import Sessions from "../../components/studentDashboard/Sessions.jsx";
import PreliminaryReqStud from "../../components/studentDashboard/PreliminaryReqStud.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import RequestGenerator from "../../components/studentDashboard/RequestGenerator.jsx";
import RequestUploader from "../../components/studentDashboard/RequestUploader.jsx";

const DahsboardStudent = () => {
  const { user } = useAuth();
  const [professor, setProfessor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user.assignedProfessorId) {
      console.log("No assigned professor");
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:3000/professor/${user.assignedProfessorId}`, {
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
        setProfessor(data.professor);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [user.assignedProfessorId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return !user.assignedProfessorId ? (
    <Tabs className="mt-7">
      <Tab label="Sesiuni active">
        <Sessions className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
      </Tab>
      <Tab label="Cereri preliminare">
        <PreliminaryReqStud className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
      </Tab>
    </Tabs>
  ) : (
    <>
      <h1 className="text-2xl text-center mt-7 text-white">
        PROFESORUL TAU ESTE {professor.name}
      </h1>
      <Tabs className="mt-7">
        <Tab label="Genereaza cererea">
          <RequestGenerator student={user} professor={professor} />
        </Tab>
        <Tab label="Incarca cererea">
          <RequestUploader />
        </Tab>
      </Tabs>
    </>
  );
};
export default DahsboardStudent;
