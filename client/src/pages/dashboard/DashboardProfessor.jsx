import { Tabs, Tab } from "../../components/ui/Tabs.jsx";
import Sessions from "../../components/professorDashboard/Sessions.jsx";
import PreliminaryReqProf from "../../components/professorDashboard/PreliminaryReqProf.jsx";
import AssignedStudents from "../../components/professorDashboard/AssignedStudents.jsx";
import FinalReq from "../../components/professorDashboard/FinalReq.jsx";

const DashBoardProfessor = () => {
  return (
    <Tabs className="mt-7">
      <Tab label="Sesiuni active">
        <Sessions className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
      </Tab>
      <Tab label="Preliminary Requests">
        <PreliminaryReqProf className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
      </Tab>
      <Tab label="Studenti">
        <AssignedStudents className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
      </Tab>
      <Tab label="Final Requests">
        <FinalReq className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
      </Tab>
    </Tabs>
  );
};

export default DashBoardProfessor;
