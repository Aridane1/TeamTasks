import axios from "axios";
const baseURL = "http://localhost:8080/api/user";

interface User {
  username?: string;
  email: string;
  password: string;
}

function getOptions() {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
}

async function register(user: User) {
  try {
    const response = await axios.post(`${baseURL}`, user, getOptions());
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default { register };
