import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("token") as string;
  const tokenDecoded = jwtDecode(token) as { id: string };
  return tokenDecoded;
};
