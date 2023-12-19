import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-start">
      <button onClick={() => navigate("/student/login")}>
        Login as Student
      </button>
      <button onClick={() => navigate("/professor/login")}>
        Login as Professor
      </button>
    </div>
  );
};

export default Auth;
