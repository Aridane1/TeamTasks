import { connect } from "mongoose";
import { MONGODB_URI } from "./config";
(async () => {
  try {
    const db = await connect(MONGODB_URI);
    console.log("DB connected to", db.connection.name);
  } catch (err) {
    console.error(`Error connecting to DB: ${MONGODB_URI}`);
    console.log(`MongoDB connection error: ${err}`);
  }
})();
