import mongoose from "mongoose";

import Contact from "../../models/contact.js";

export const getOneContact = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ message: "Not found" });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    } else if (contact.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send(contact);
  } catch (e) {
    next(e);
  }
};
