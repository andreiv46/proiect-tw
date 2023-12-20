import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const RegisterProfessor = ({ userType }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/logout");
    }
  }, [isLoggedIn, navigate]);

  const getImageSrc = () => {
    if (userType === "student") {
      return "/student.svg";
    } else if (userType === "professor") {
      return "/professor.svg";
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/auth/professor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lastName + " " + firstName,
        email,
        password,
      }),
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
          alert("Registration successful");
          navigate("/professor/login");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 justify-items-center mt-12"
    >
      <img src={getImageSrc()} alt="Student Icon" className="h-24 w-24" />
      <input
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        type="text"
        value={lastName}
        onChange={handleLastNameChange}
        placeholder="Last Name"
      />
      <input
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
        placeholder="First Name"
      />
      <input
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <input
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button
        className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white font-bold font-mono"
        type="submit"
      >
        REGISTER
      </button>
    </form>
  );
};

export default RegisterProfessor;
