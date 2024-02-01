// src/config/webpushConfig.js
import webpush from "web-push";
import { PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } from "./config";

const vapidKeys = {
  publicKey: PUBLIC_VAPID_KEY,
  privateKey: PRIVATE_VAPID_KEY,
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default webpush;
