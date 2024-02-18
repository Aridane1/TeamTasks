import { message } from "antd";
import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("token") as string;
  const tokenDecoded = jwtDecode(token) as { id: string; username: string };
  return tokenDecoded;
};

export const loginValidation = (email?: string, password?: string) => {
  if (!email || !password) {
    message.warning("Por favor, Rellena todos los campos", 5);
    return false;
  }

  return true;
};

export const registerValidation = (
  email?: string,
  username?: string,
  password?: string
) => {
  if (!email || !password || !username) {
    message.warning("Por favor, Rellena todos los campos", 5);
    return false;
  }

  return true;
};
