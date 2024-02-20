import axios from "axios";
import { backendTaskEnpoint } from "../constants/backendEndpoints";
import { decodeToken } from "../utils/shared/globalFunctions";
import { backendUserTaskEnpoint } from "../../../frontend/src/constants/backendEnpoints";

interface Task {
  title: string;
  description: string;
  limit_day?: string;
  tag?: string;
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

async function addTask(task: Task, blob: Blob | string) {
  try {
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("limit_day", task.limit_day ?? "");
    formData.append("tag", task.tag ?? "");
    formData.append("userId", task.userId);
    formData.append("file", blob);
    const response = await axios.post(
      `${backendTaskEnpoint}/taskPhoto`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error en TaskService", error);
  }
}

async function getUserTask() {
  try {
    const user = decodeToken();
    const response = await axios.get(`${backendUserTaskEnpoint}/${user.id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
async function deleteTaskUser({ id }: { id: string }) {
  try {
    const response = await axios.delete(`${backendTaskEnpoint}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getUserTask,
  deleteTaskUser,
  getAllTasks,
  addTask,
};
