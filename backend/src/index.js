import app from "./app";
import "./database";
import { PORT } from "./config";
import { notifyDeadlineApproaching } from "./utils/sendNotificationsUtils";

app.listen(PORT, () => {
  console.log("Server running in port", PORT);
  // setInterval(() => {
  //   const now = new Date();
  //   notifyDeadlineApproaching(now);
  // }, 5000);
});
