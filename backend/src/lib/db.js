import mongoose from "mongoose";
import { ENV } from "./ENV.js";

export const connectDB = async () => {
  try {
    const mongoUrl = ENV.MONGO_URL || ENV.MONGO_URI;
    if (!mongoUrl) {
      throw new Error("Missing MONGO_URL (or MONGO_URI) in environment");
    }
    const conn = await mongoose.connect(mongoUrl);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    process.exit(1);
  }
};
