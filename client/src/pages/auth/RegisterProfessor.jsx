import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { getImageSrc } from "../../../lib/utils.jsx";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import toast from "react-hot-toast";

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
        navigate("/professor/login");
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
        vlaue={lastName}
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
      <Button type="submit">REGISTER</Button>
    </form>
  );
};

export default RegisterProfessor;
