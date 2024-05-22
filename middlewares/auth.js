import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (typeof authHeader === "undefined") {
      return res.status(401).send({ message: "Not authorized" });
    }

    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer") {
      return res.status(401).send({ message: "Not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Not authorized" });
      }

      req.user = {
        id: decode.id,
        email: decode.email,
      };

      next();
    });
  } catch (e) {
    next(e);
  }
};
