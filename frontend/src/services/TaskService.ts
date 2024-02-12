import axios from "axios";
import { backendTaskEnpoint } from "../constants/backendEnpoints";

async function getAllTasks() {
  try {
    const response = await axios.get(`${backendTaskEnpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error en TaskService", error);
  }
}

export default {
  getAllTasks,
};
