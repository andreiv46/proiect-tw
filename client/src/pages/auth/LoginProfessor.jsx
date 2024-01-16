import { ROLES } from "../../../../server/config/constants";
import Login from "../../components/Login";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const LoginProfessor = () => {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/logout");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (user) => {
    const { email, password } = user;
    fetch("http://localhost:3000/auth/professor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
        console.log(data);
        toast.success("Login successful");
        login(data.token, ROLES.PROFESSOR, data.user);
        navigate("/dashboard/professor");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Login onLogin={handleLogin} userType="professor" />
    </div>
  );
};

export default LoginProfessor;
