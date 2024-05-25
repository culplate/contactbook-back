import express from "express";
import { updateAvatar } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { avatarUploadMiddleware } from "../middlewares/avatarUpload.js";

const userRouter = express.Router();

userRouter.patch(
  "/avatar",
  authMiddleware,
  avatarUploadMiddleware,
  updateAvatar
);

export default userRouter;
