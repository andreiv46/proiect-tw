import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import LoginStudent from "./pages/LoginStudent.jsx";
import LoginProfessor from "./pages/LoginProfessor.jsx";
import Profile from "./pages/Profile.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import RegisterProfessor from "./pages/RegisterProfessor.jsx";
import RegisterStudent from "./pages/RegisterStudent.jsx";
import Auth from "./pages/Auth.jsx";
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
        <Route path="/" element={<div>Home</div>} />
        <Route element={<PrivateRoutes allowedRole={ROLES.STUDENT} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<div>Test</div>} />
        </Route>
        <Route element={<PrivateRoutes allowedRole={ROLES.PROFESSOR} />}>
          <Route path="/test2" element={<div>Test2</div>} />
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
        <Route path="*" element={<div>Page not found</div>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
