// import contactsService from "../services/contactsServices.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  res.json({
    status: "sucess",
    code: 200,
    data: await listContacts(),
  });
};

export const getOneContact = async (req, res) => {
  const contact = await getContactById(req.params.id);

  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

export const deleteContact = async (req, res) => {
  const contact = await removeContact(req.params.id);

  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
