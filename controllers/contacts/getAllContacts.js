import Contact from "../../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });
    return res.status(200).send(contacts);
  } catch (e) {
    next(e);
  }
};
