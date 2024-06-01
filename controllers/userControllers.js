import multer from "multer";
import User from "../models/user.js";
import * as fs from "node:fs/promises";
import path from "node:path";
import Jimp from "jimp";
import { sendMail } from "../helpers/mail.js";
import { emailSchema } from "../schemas/usersSchemas.js";

export const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken: verificationToken });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    return res.status(200).send({ message: "Verification successful" });
  } catch (e) {
    next(e);
  }
};

export const reVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const { error, value } = emailSchema.validate({ email });

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const user = await User.findOne({ email: value.email });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.verify === true) {
      return res
        .status(400)
        .send({ message: "Verification has already been passed" });
    }

    //TODO put message template to another file
    sendMail({
      to: user.email,
      from: "culplate@gmail.com",
      subject: "Welcome to ContactBook!",
      html: `To finish registration, please, click the <a href='http://localhost:${process.env.PORT}/api/users/verify/${user.verificationToken}'>link</a>`,
      text: `To finish registration, please, click the <a href='http://localhost:${process.env.PORT}/api/users/verify/${user.verificationToken}'>link</a>`,
    });

    return res.status(200).send({ message: "Verification email sent" });
  } catch (e) {
    next(e);
  }
};

export const getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.avatarUrl === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }

    res.sendFile(path.resolve("public" + user.avatarUrl));
  } catch (e) {
    next(e);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    // checking the abscence of file
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    //TODO make resize helper
    const image = (await Jimp.read(req.file.path))
      .resize(250, 250)
      .writeAsync(req.file.path);

    // moving avatar from tmp to public/avatars
    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );

    // deleting old avatar
    //TODO make proper checks if fiel exists
    if (user.avatarUrl !== null) {
      await fs.unlink(path.resolve("public" + user.avatarUrl));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: `/avatars/${req.file.filename}` },
      { new: true }
    );
    if (updatedUser === null) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      avatarUrl: updatedUser.avatarUrl,
    });
  } catch (e) {
    if (e instanceof multer.MulterError) {
      return res.status(400).send({ message: e.message });
    } else {
      next(e);
    }
  }
};
