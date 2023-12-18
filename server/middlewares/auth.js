import { JWT_KEY } from "../config/constants.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header not provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

export const verifyStudent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.decodedToken.role === "student") {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  });
};

export const verifyProfessor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.decodedToken.role === "professor") {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  });
};
