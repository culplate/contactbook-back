import {
  createContactSchema,
  updateContactSchema,
  toggleFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import Contact from "../models/contact.js";
import mongoose from "mongoose";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });
    return res.status(200).send(contacts);
  } catch (e) {
    next(e);
  }
};

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

export const createContact = async (req, res, next) => {
  try {
    const reqContact = req.body;
    const { error, value } = createContactSchema.validate(reqContact);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const contact = await Contact.create({ ...value, owner: req.user.id });
    return res.status(201).send(contact);
  } catch (e) {
    next(e);
  }
};

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

export const updateStatusContact = async (req, res, next) => {
  try {
    const reqFav = req.body;
    const { error, value } = toggleFavoriteSchema.validate(reqFav);

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
