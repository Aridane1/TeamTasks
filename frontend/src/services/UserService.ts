import axios from "axios";
import { backendAuthEnpoint } from "../constants/backendEndpoints";

async function getAllUsers() {
  try {
    const response = await axios.get(`${backendAuthEnpoint}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default { getAllUsers };
