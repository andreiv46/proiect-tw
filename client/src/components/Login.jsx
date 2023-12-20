import { useState } from "react";

const Login = ({ onLogin, userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getImageSrc = () => {
    if (userType === "student") {
      return "/student.svg";
    } else if (userType === "professor") {
      return "/professor.svg";
    }
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
        <img src={getImageSrc()} alt="Student Icon" className="h-24 w-24" />
        <input
          className="bg-gray-200 px-4 py-2 rounded-lg w-64"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-gray-200 px-4 py-2 rounded-lg w-64"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white font-bold font-mono"
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
