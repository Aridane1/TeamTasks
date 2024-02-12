import axios from "axios";
import { backendAuthEnpoint } from "../constants/backendEnpoints";

interface User {
  username?: string;
  email: string;
  password: string;
}

function getOptions(user: User) {
  console.log(user);
  const base64UserAndPassword = window.btoa(user.email + ":" + user.password);

  const basicAccess = "Basic " + base64UserAndPassword;
  const options = {
    headers: {
      Authorization: basicAccess,
      "Content-Type": "application/json",
    },
  };

  return options;
}

async function login(user: User) {
  try {
    const response = await axios.post(
      `${backendAuthEnpoint}/signin`,
      {},
      getOptions(user)
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function register(user: User) {
  try {
    const response = await axios.post(
      `${backendAuthEnpoint}`,
      user.username,
      getOptions(user)
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default { login, register };
