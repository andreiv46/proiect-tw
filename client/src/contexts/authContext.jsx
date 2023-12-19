import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log("AuthProvider mounted");
    if (token) {
      fetch("http://localhost:3000/auth/validateToken", {
        body: JSON.stringify({ token }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            logout();
            throw new Error(`ERROR LMAO status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            logout();
          } else {
            setRole(data.role);
            setIsLoggedIn(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    setRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isLoggedIn, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
