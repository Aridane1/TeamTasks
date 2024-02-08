import axios from "axios";
const baseURL = "http://localhost:8080/api/user";

async function getAllUsers() {
  const response = await axios.get(baseURL);
  return response.data;
}

export default { getAllUsers };
