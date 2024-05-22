import User from "../models/user.js";
import bcrypt from "bcrypt";
import {
  registerUserSchema,
  loginUserSchema,
} from "../schemas/usersSchemas.js";

export const registerUser = async (req, res, next) => {
  const reqData = req.body;
  const { error, value } = registerUserSchema.validate({
    email: reqData.email,
    password: reqData.password,
  });

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const user = await User.findOne({ email: value.email });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(value.password, 10);
    const result = await User.create({
      email: value.email,
      password: passwordHash,
    });

    return res.status(201).send({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const loginUser = (req, res, next) => {};

export const logoutUser = (req, res, next) => {};
