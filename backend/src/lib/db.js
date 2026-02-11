import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.log(process.env.MONGO_URL);
    console.error("Error connection to MONGODB:", error);
    process.exit(1);
  }
};
