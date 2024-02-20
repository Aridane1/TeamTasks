import axios from "axios";
import { backendTaskEnpoint } from "../constants/backendEnpoints";
import { backendTaskWithPhotoEnpoint } from "../constants/backendEnpoints";


interface Task {
  title: string,
  description:string,
  limit_day?: string,
  task_image?: string
  userId: string;
}
async function getAllTasks() {
  try {
    const response = await axios.get(`${backendTaskEnpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error en TaskService", error);
  }
}


async function addTask(task: Task) {
  try {
    const response = await axios.post(`${backendTaskWithPhotoEnpoint}`, task);
    return response.data;
  } catch (error) {
    console.error("Error en TaskService", error);
  }
}


export default {
  getAllTasks,
  addTask
};
