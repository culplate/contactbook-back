import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/current", authMiddleware, getCurrentUser);

export default authRouter;
