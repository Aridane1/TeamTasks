import axios from "axios";
import { backendUserTaskEnpoint } from "../constants/backendEnpoints";

async function getAllTasks() {
  try {
    const response = await axios.get(backendUserTaskEnpoint);
    return response.data;
  } catch (error) {
    console.error("Error en TaskService", error);
  }
}

export default {
  getAllTasks,
};
