import axios from "axios";
import { backendDeviceEnpoint } from "../constants/backendEnpoints";
type Device = {
  endpoint: PushSubscription;
  keys: {
    p256dh: PushSubscription;
    auth: PushSubscription;
  };
};
async function postDevice(subscription: Device) {
  try {
    console.log(subscription);
    // const token = localStorage.getItem("token");
    // if (!token) return;
    // const decode = jwtDecode(token) as Token;
    // const response = await axios.post(`${backendDeviceEnpoint}`, {
    //   subscription: subscription,
    //   user_id: decode.id,
    // });
    // return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default { postDevice };
