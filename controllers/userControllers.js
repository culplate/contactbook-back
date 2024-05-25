import User from "../models/user.js";

export const updateAvatar = async (req, res, next) => {
  try {
    res.status(200).send({ message: "Updated" });
  } catch (e) {
    next(e);
  }
};
