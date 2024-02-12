import axios from "axios";
import { jwtDecode } from "jwt-decode";
const baseURL = "http://localhost:8080/api/device";
interface Device {
  endpoint: string;
  keys: string;
  user_id?: string;
}
interface Token {
  id: string;
}
async function postDevice(subscription: Device) {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decode = jwtDecode(token) as Token;
    const response = await axios.post(baseURL, {
      subscription: subscription,
      user_id: decode.id,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default { postDevice };
