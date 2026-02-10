import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRouter);

app.listen(PORT, () => console.log(`server is running in PORT ${PORT}`));
