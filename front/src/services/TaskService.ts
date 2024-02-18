import axios from "axios";
import {
  backendTaskEnpoint,
  backendUserTaskEnpoint,
} from "../constants/backendEndpoints";
import { decodeToken } from "../utils/shared/globalFunctions";

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

export default { getUserTask, deleteTaskUser };
