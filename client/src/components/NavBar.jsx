import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="flex justify-between">
      <div>Home</div>
      <div>DISERTATIE LMAO</div>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Sign in</button>
      )}
    </div>
  );
};

export default NavBar;
