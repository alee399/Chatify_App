import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const _dirname = path.resolve();

const PORT = process.env.PORT || 4000;
app.use(express.json()); //for req.body
app.use(cookieParser()); //for req.cookies

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRouter);

//make for deployment ready
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(_dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`server is running in PORT ${PORT}`);
  connectDB();
});
