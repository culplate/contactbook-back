import express from "express";

import { authMiddleware } from "../middlewares/auth.js";
import { avatarUploadMiddleware } from "../middlewares/avatarUpload.js";

const userRouter = express.Router();

export default userRouter;
