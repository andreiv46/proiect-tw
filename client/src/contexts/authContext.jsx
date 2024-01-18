import React, { useEffect, useRef, useState } from "react";
import { ROLES } from "../../../server/config/constants";
import socketIO from "socket.io-client";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef();

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
          login(data.token, data.role, data.user);
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

  useEffect(() => {
    if (isLoggedIn && role === ROLES.STUDENT) {
      console.log("connecting to socket");
      socketRef.current = socketIO.connect("http://localhost:3000", {
        query: { userId: user.studentId },
      });
      socketRef.current.on("preliminaryRequestAccepted", (data) =>
        setUser(data)
      );
      socketRef.current.on("finalRequestAccepted", (data) => setUser(data));
    } else if (!isLoggedIn && socketRef.current) {
      console.log("disconnecting from socket");
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isLoggedIn, role, user]);

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
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ role, login, logout, isLoggedIn, loading, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
