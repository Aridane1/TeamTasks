import axios from "axios";
import { backendAuthEnpoint } from "../constants/backendEndpoints";

function getOptions(user: { email: string; password: string }) {
  console.log(user);
  const base64UserAndPassword = window.btoa(user.email + ":" + user.password);

  const basicAccess = "Basic " + base64UserAndPassword;
  const options = {
    headers: {
      Authorization: basicAccess,
    },
  };
  return options;
}

async function login(user: { email: string; password: string }) {
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

async function register(user: {
  email: string;
  password: string;
  username: string;
}) {
  try {
    const response = await axios.post(
      `${backendAuthEnpoint}`,
      { username: user.username },
      getOptions(user)
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export default { login, register };
