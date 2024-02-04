import server from "./wsServer";
import "./database";
import { PORT } from "./config";
import { notifyDeadlineApproaching } from "./utils/sendNotificationsUtils";

server.listen(PORT, () => {
  console.log("Server running in port", PORT);
  // setInterval(() => {
  //   const now = new Date();
  //   notifyDeadlineApproaching(now);
  // }, 5000);
});
