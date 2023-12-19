import { useContext } from "react";
import { AuthContext } from "../contexts/authContext.jsx";

export const useAuth = () => {
  return useContext(AuthContext);
};
