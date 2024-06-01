import express from "express";
import {
  getAvatar,
  updateAvatar,
  verifyUser,
  reVerifyUser,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { avatarUploadMiddleware } from "../middlewares/avatarUpload.js";
import user from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/verify/:verificationToken", verifyUser);
userRouter.post("/verify", reVerifyUser);
userRouter.get("/avatars", authMiddleware, getAvatar);
userRouter.patch(
  "/avatars",
  authMiddleware,
  avatarUploadMiddleware,
  updateAvatar
);

export default userRouter;
