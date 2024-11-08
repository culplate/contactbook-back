import express from "express";

import { getAllContacts } from "../controllers/contacts/getAllContacts.js";
import { updateStatusContact } from "../controllers/contacts/updateStatusContact.js";
import { updateContact } from "../controllers/contacts/updateContact.js";
import { createContact } from "../controllers/contacts/createContact.js";
import { deleteContact } from "../controllers/contacts/deleteContact.js";
import { getOneContact } from "../controllers/contacts/getOneContact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", createContact);
contactsRouter.put("/:id", updateContact);
contactsRouter.patch("/:id/favorite", updateStatusContact);

export default contactsRouter;
