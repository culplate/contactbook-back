import express from "express";
import contactsRouter from "./contactsRouter.js";
import authRouter from "./authRouter.js";

const router = express.Router();
const jsonParser = express.json();

router.use("/contacts", jsonParser, contactsRouter);
router.use("/users", jsonParser, authRouter);

export default router;
