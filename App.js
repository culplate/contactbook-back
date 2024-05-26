import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import path from "node:path";

import "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(cors());

app.use("/api/avatars", express.static(path.resolve("public/avatars")));
app.use("/api", routes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
