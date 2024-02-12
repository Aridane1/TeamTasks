import axios from "axios";
const baseURL = "http://localhost:8080/api";

async function getAllTasks() {
  try {
    const response = await axios.get(`${baseURL}/task`);
    return response.data;
  } catch (error) {
    console.error("Error en TaskService", error);
  }
}

export default {
  getAllTasks,
};
