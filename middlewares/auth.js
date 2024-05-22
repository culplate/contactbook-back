import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }

    try {
      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).send({ message: "Not authorized" });
      } else if (user.token !== token) {
        return res.status(401).send({ message: "Not authorized" });
      }

      req.user = {
        id: decode.id,
        email: decode.email,
      };

      next();
    } catch (e) {
      next(e);
    }
  });
};
