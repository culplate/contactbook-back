import mongoose from "mongoose";

import Contact from "../../models/contact.js";

export const deleteContact = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ message: "Not found" });
    }

    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send(contact);
  } catch (e) {
    next(e);
  }
};
