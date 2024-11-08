import mongoose from "mongoose";

import { updateContactSchema } from "../../schemas/contactsSchemas.js";
import Contact from "../../models/contact.js";

export const updateContact = async (req, res, next) => {
  try {
    const reqContact = req.body;
    const { error, value } = updateContactSchema.validate(reqContact);

    if (error) {
      return res.status(400).send({ message: error.message });
    } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ message: "Not found" });
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      value,
      { new: true }
    );

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send(contact);
  } catch (e) {
    next(e);
  }
};
