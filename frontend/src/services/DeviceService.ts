import axios from "axios";
import { backendDeviceEnpoint } from "../constants/backendEndpoints";
type Device = {
  subscription: PushSubscription;
  user_id: string;
};

async function postDevice(subscription: Device) {
  try {
    const response = await axios.post(`${backendDeviceEnpoint}`, {
      subscription: subscription,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default { postDevice };
