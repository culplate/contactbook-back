import { createContactSchema } from "../../schemas/contactsSchemas.js";
import Contact from "../../models/contact.js";

export const createContact = async (req, res, next) => {
  try {
    const reqContact = req.body;
    const { error, value } = createContactSchema.validate(reqContact);

    if (error) {
      console.log(error.message);

      return res.status(400).send({ message: error.message });
    }

    const contact = await Contact.create({ ...value, owner: req.user.id });
    return res.status(201).send(contact);
  } catch (e) {
    next(e);
  }
};
