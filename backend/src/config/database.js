import { connect } from "mongoose";
import { MONGODB_URI } from "./envConfig";

(async () => {
  try {
    const db = await connect(MONGODB_URI);
    console.log("DB connected to", db.connection.name);
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
})();
