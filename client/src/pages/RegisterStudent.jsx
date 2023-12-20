import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const RegisterStudent = ({ userType }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("Informatica Economica");
  const [year, setYear] = useState(2);
  const [studentClass, setStudentClass] = useState("IE-2A");
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

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handleYearChange = (e) => {
    const yearInt = parseInt(e.target.value);
    setYear(yearInt);
  };

  const handleStudentClassChange = (e) => {
    setStudentClass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/auth/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lastName + " " + firstName,
        email,
        password,
        major,
        studentClass,
        year,
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
          navigate("/student/login");
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

      <select
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        value={major}
        onChange={handleMajorChange}
      >
        <option value={"Informatica Economica"}>Informatica Economica</option>
        <option value={"Cibernetica si Economie Cantitativa"}>
          Cibernetica si Economie Cantitativa
        </option>
        <option value={"Statistica Aplicata si Data science"}>
          Statistica Aplicata si Data science
        </option>
        <option value={"Baze de date"}>Baze de date</option>
        <option value={"E-Business"}>E-Business</option>
        <option value={"Securitatea Informatica "}>
          Securitatea Informatica
        </option>
      </select>

      <label htmlFor="year" className="font-bold text-white block mt-2">
        Year
      </label>
      <select
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        value={year}
        onChange={handleYearChange}
      >
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <label htmlFor="studentClass" className="font-bold text-white block mt-2">
        Class
      </label>
      <select
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        value={studentClass}
        onChange={handleStudentClassChange}
      >
        <option value={"IE-2A"}>IE-2A</option>
        <option value={"IE-2B"}>IE-2B</option>
        <option value={"IE-2C"}>IE-2C</option>
        <option value={"IE-2D"}>IE-2D</option>
        <option value={"IE-2E"}>IE-2E</option>
      </select>

      <button
        className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white font-bold font-mono"
        type="submit"
      >
        REGISTER
      </button>
    </form>
  );
};

export default RegisterStudent;
