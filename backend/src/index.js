import server from "./config/wsServer";
import "./config/database";
import { PORT } from "./config/envConfig";
import { notifyDeadlineApproaching } from "./utils/sendNotificationsUtils";

server.listen(PORT, () => {
  console.log("Server running in port", PORT);
  setInterval(() => {
    const now = new Date();
    notifyDeadlineApproaching(now);
  }, 1000 * 60 * 60 * 24);
});
