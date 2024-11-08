import express from "express";

import { authMiddleware } from "../middlewares/auth.js";

import { registerUser } from "../controllers/auth/register.js";
import { loginUser } from "../controllers/auth/login.js";
import { logoutUser } from "../controllers/auth/logout.js";
import { getCurrentUser } from "../controllers/auth/current.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/current", authMiddleware, getCurrentUser);

export default authRouter;
