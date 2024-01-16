import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { getImageSrc } from "../../../lib/utils.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import toast from "react-hot-toast";

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

  const handleYearChange = (e) => {
    const yearInt = parseInt(e.target.value);
    setYear(yearInt);
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
        toast.success("Registration successful");
        navigate("/student/login");
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
      <img
        src={getImageSrc(userType)}
        alt="Student Icon"
        className="h-24 w-24"
      />
      <Input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <Input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <select
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
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

      <label htmlFor="year" className="block text-sm font-medium text-white">
        Year
      </label>
      <select
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        value={year}
        id="year"
        onChange={handleYearChange}
      >
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <label
        htmlFor="studentClass"
        className="block text-sm font-medium text-white"
      >
        Class
      </label>
      <select
        id="studentClass"
        className="bg-gray-200 px-4 py-2 rounded-lg w-64"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
      >
        <option value={"IE-2A"}>IE-2A</option>
        <option value={"IE-2B"}>IE-2B</option>
        <option value={"IE-2C"}>IE-2C</option>
        <option value={"IE-2D"}>IE-2D</option>
        <option value={"IE-2E"}>IE-2E</option>
      </select>

      <Button type="submit">REGISTER</Button>
    </form>
  );
};

export default RegisterStudent;
