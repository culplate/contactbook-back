import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import {
  registerUserSchema,
  loginUserSchema,
} from "../schemas/usersSchemas.js";
import { sendMail } from "../helpers/mail.js";

export const registerUser = async (req, res, next) => {
  const reqData = req.body;
  const { error, value } = registerUserSchema.validate(reqData);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const user = await User.findOne({ email: value.email });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(value.password, 10);
    const verificationToken = crypto.randomUUID();

    //TODO move it to helpers
    const avatar = gravatar.url(value.email, { s: "250", d: "mp" }, true);

    const result = await User.create({
      email: value.email,
      password: passwordHash,
      avatarUrl: avatar,
      verificationToken,
    });

    //TODO put message template to another file
    sendMail({
      to: value.email,
      from: "culplate@gmail.com",
      subject: "Welcome to ContactBook!",
      html: `To finish registration, please, click the <a href='http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}'>link</a>`,
      text: `To finish registration, please, click the <a href='http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}'>link</a>`,
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

export const loginUser = async (req, res, next) => {
  const reqData = req.body;
  const { error, value } = loginUserSchema.validate(reqData);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const user = await User.findOne({ email: value.email });
    if (user === null) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const passwordIsValid = await bcrypt.compare(value.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    if (user.verify === false) {
      return res.status(401).send({ message: "Please verify your email" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(401).send({ message: "Not authorized" });
    }

    return res.status(200).send({
      email: user.email,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl,
    });
  } catch (e) {
    next(e);
  }
};
