import axios from "axios";
const baseURL = "http://localhost:8080/api";

async function getaAllCollaborators(id:string) {
  try {
    const response = await axios.get(`${baseURL}/collaborators/collaboratorPhoto/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error en ColloraboratorService",error);
  }
}
export default {
    getaAllCollaborators,
};
