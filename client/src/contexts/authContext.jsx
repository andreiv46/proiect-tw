import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
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
            login(data.token, data.role, data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, role, user) => {
    localStorage.setItem("token", token);
    setRole(role);
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ role, login, logout, isLoggedIn, loading, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
