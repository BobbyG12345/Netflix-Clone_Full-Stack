import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 30 days
  });
  res.cookie("jwt-netflix", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie, preventing XSS attacks
    secure: ENV_VARS.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Helps prevent CSRF attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
  return token;
};
