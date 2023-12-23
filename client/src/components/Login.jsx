import { useState } from "react";
import { getImageSrc } from "../../lib/utils.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

const Login = ({ onLogin, userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-3 justify-items-center mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          onLogin({ email, password });
        }}
      >
        <img
          src={getImageSrc(userType)}
          alt="Student Icon"
          className="h-24 w-24"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit">LOGIN</Button>
      </form>
    </div>
  );
};

export default Login;
