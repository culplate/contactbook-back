import gravatar from "gravatar";
import bcrypt from "bcrypt";

import User from "../../models/user.js";
import { registerUserSchema } from "../../schemas/usersSchemas.js";

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

    //TODO move it to helpers
    const avatar = gravatar.url(value.email, { s: "250", d: "mp" }, true);

    const result = await User.create({
      name: value.name,
      email: value.email,
      password: passwordHash,
      avatarUrl: avatar,
    });

    return res.status(201).send({
      user: {
        name: result.name,
        email: result.email,
      },
    });
  } catch (e) {
    next(e);
  }
};
