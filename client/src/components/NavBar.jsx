import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 sm:py-5 sm:px-10
    bg-gradient-to-r from-green-400 to-blue-500 text-white font-mono font-bold"
    >
      <div className="flex-1 text-center"></div>
      <div className="flex-1 text-center text-4xl">DISERTATIE</div>
      {isLoggedIn ? (
        <div className="flex-1 text-center">
          <button
            className="bg-green-500 py-2 px-2 rounded-lg hover:bg-green-600"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <div className="flex-1 text-center">
          <button
            className="bg-green-500 py-2 px-2 rounded-lg hover:bg-green-600"
            onClick={handleLogin}
          >
            SIGN IN
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
