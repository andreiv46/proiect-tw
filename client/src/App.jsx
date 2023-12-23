import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import LoginStudent from "./pages/auth/LoginStudent.jsx";
import LoginProfessor from "./pages/auth/LoginProfessor.jsx";
import Profile from "./pages/Profile.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import RegisterProfessor from "./pages/auth/RegisterProfessor.jsx";
import RegisterStudent from "./pages/auth/RegisterStudent.jsx";
import Auth from "./pages/auth/Auth.jsx";
import DashBoardProfessor from "./pages/dashboard/DashboardProfessor.jsx";
import DashBoardStudent from "./pages/dashboard/DashBoardStudent.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

const ROLES = {
  STUDENT: 1234,
  PROFESSOR: 2345,
};

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes allowedRole={ROLES.STUDENT} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/student" element={<DashBoardStudent />} />
        </Route>
        <Route element={<PrivateRoutes allowedRole={ROLES.PROFESSOR} />}>
          <Route path="/dashboard/professor" element={<DashBoardProfessor />} />
        </Route>
        <Route path="/student/login" element={<LoginStudent />}></Route>
        <Route path="/professor/login" element={<LoginProfessor />}></Route>
        <Route
          path="professor/register"
          element={<RegisterProfessor userType={"professor"} />}
        ></Route>
        <Route
          path="student/register"
          element={<RegisterStudent userType={"student"} />}
        ></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<div>Page not found!</div>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
