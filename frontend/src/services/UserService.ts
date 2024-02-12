import axios from "axios";
import { backendAuthEnpoint } from "../constants/backendEnpoints";

async function getAllUsers() {
  const response = await axios.get(backendAuthEnpoint);
  return response.data;
}

export default { getAllUsers };
