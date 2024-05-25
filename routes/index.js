import express from "express";
import contactsRouter from "./contactsRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.use("/contacts", jsonParser, authMiddleware, contactsRouter);
router.use("/users", jsonParser, authRouter, userRouter);

export default router;
