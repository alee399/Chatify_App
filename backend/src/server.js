import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path";

dotenv.config();
const app = express();
const _dirname = path.resolve();

const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRouter);

//make for deployment ready
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(_dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => console.log(`server is running in PORT ${PORT}`));
