import { ROLES } from "../../../server/config/constants";
import Login from "../components/Login";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginStudent = () => {
  const { isLoggedin, login } = useAuth();
  const navigate = useNavigate();

  if (isLoggedin) {
    navigate("/profile");
  }

  const handleLogin = (user) => {
    const { email, password } = user;
    fetch("http://localhost:3000/auth/professor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful");
          login(data.token, ROLES.PROFESSOR);
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginStudent;
