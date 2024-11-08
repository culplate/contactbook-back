import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";
import { loginUserSchema } from "../../schemas/usersSchemas.js";

export const loginUser = async (req, res, next) => {
  const reqData = req.body;
  const { error, value } = loginUserSchema.validate(reqData);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const user = await User.findOne({ email: value.email });
    if (user === null) {
      console.log("18");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const passwordIsValid = await bcrypt.compare(value.password, user.password);
    if (!passwordIsValid) {
      console.log("24");
      return res.status(401).send({ message: "Email or password is wrong" });
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
