import multer from "multer";
import User from "../models/user.js";
import * as fs from "node:fs/promises";
import path from "node:path";

export const getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.avatarUrl === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }

    res.sendFile(path.resolve("public/avatars", user.avatarUrl));
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

    // moving avatar from tmp to public/avatars
    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: req.file.filename },
      { new: true }
    );

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      message: "Avatar updated",
      avatarUrl: user.avatarUrl,
    });
  } catch (e) {
    if (e instanceof multer.MulterError) {
      return res.status(400).send({ message: e.message });
    } else {
      next(e);
    }
  }
};
