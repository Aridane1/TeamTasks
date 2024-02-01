import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY;
export const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY;
