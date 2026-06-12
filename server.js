import dotenv from "dotenv"
import connectDB from "./config/db.js";
import app from "./app.js";
import "./cron/wfhCron.js";

import dns from "dns" ///new

dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server Running ${process.env.PORT}`);
});