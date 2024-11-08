import User from "../../models/user.js";

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
