import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  res.status(200).send({ data: await listContacts() });
};

export const getOneContact = async (req, res) => {
  const contact = await getContactById(req.params.id);

  if (!contact) {
    res.status(404).send({ message: "Not found" });
    return;
  }

  res.status(200).send({ data: contact });
};

export const deleteContact = async (req, res) => {
  const contact = await removeContact(req.params.id);

  if (!contact) {
    res.status(404).send({ message: "Not found" });
    return;
  }

  res.status(200).send({ data: contact });
};

export const createContact = async (req, res) => {
  const reqContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const { error, value } = createContactSchema.validate(reqContact);

  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  const contact = await addContact(value);
  res.status(201).send(contact);
};

export const updateContact = async (req, res) => {
  const reqContact = req.body;
  const { error, value } = updateContactSchema.validate(reqContact);

  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  const contact = await updateContactById(req.params.id, value);

  if (!contact) {
    res.status(404).send({ message: "Not found" });
    return;
  }

  res.status(200).send(contact);
};
