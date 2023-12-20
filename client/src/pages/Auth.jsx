import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-y-10 justify-items-center mt-12">
      <button
        className="bg-rose-500 hover:bg-rose-600 px-6 py-4 rounded-lg text-white font-bold font-mono flex items-center justify-center w-80"
        onClick={() => navigate("/student/login")}
      >
        <img src="/student.svg" alt="Student Icon" className="ml-2 h-6 w-6" />
        <span>LOG IN AS STUDENT</span>
      </button>
      <button
        className="bg-rose-500 hover:bg-rose-600 px-6 py-4 rounded-lg text-white font-bold font-mono flex items-center justify-center w-80"
        onClick={() => navigate("/professor/login")}
      >
        <img src="/professor.svg" alt="Student Icon" className="ml-2 h-6 w-6" />
        <span>LOG IN AS PROFESSOR</span>
      </button>
      <button
        className="bg-rose-500 hover:bg-rose-600 px-6 py-4 rounded-lg text-white font-bold font-mono flex items-center justify-center w-80"
        onClick={() => navigate("/student/register")}
      >
        <img src="/student.svg" alt="Student Icon" className="ml-2 h-6 w-6" />
        <span>REGISTER AS STUDENT</span>
      </button>
      <button
        className="bg-rose-500 hover:bg-rose-600 px-6 py-4 rounded-lg text-white font-bold font-mono flex items-center justify-center w-80"
        onClick={() => navigate("/professor/register")}
      >
        <img src="/professor.svg" alt="Student Icon" className="ml-2 h-6 w-6" />
        <span>REGISTER AS PROFESSOR</span>
      </button>
    </div>
  );
};

export default Auth;
