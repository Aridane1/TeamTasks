import axios from "axios";
import { backendConfigurationEnpoint } from "../constants/backendEndpoints";
import { decodeToken } from "../utils/shared/globalFunctions";

async function getConfigurationByUser() {
  try {
    const user = decodeToken();
    const response = await axios.get(
      `${backendConfigurationEnpoint}/${user.id}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
async function putConfigurationByUserWithPhoto(configuration: {
  night_mode?: boolean | undefined;
  list_mode?: boolean | undefined;
  user_image?: Blob | undefined;
  user_id: string;
}) {
  try {
    const user = decodeToken();
    const formData = new FormData();
    formData.append("list_mode", JSON.stringify(configuration.list_mode));
    formData.append("night_mode", JSON.stringify(configuration.night_mode));
    formData.append("user_id", configuration.user_id);
    formData.append("file", configuration.user_image ?? "");
    const response = await axios.put(
      `${backendConfigurationEnpoint}/${user.id}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function putConfigurationByUser(configuration: {
  night_mode?: boolean | undefined;
  list_mode?: boolean | undefined;
  user_id: string;
}) {
  try {
    const user = decodeToken();

    const response = await axios.put(
      `${backendConfigurationEnpoint}/noPhoto/${user.id}`,
      configuration
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getConfigurationByUser,
  putConfigurationByUserWithPhoto,
  putConfigurationByUser,
};
