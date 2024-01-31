import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateToken = (userData) => {
  if (!userData) return null;

  var user = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  return jwt.sign(user, JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
};

export const getCleanUser = (userData) => {
  if (!userData) return null;

  return {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };
};
