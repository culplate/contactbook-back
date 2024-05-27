import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path
      .basename(file.originalname, extname)
      .split(" ")
      .join("_")
      .split("/")
      .join("_");
    const suffix = crypto.randomUUID();
    cb(null, `${basename}_${suffix}${extname}`);
  },
});

export const avatarUploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 2097152 }, // 2MB max file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error(
        "Only PNG, JPG, and JPEG file formats are accepted"
      );
      error.status = 415;
      return cb(error, false);
    }

    cb(null, true);
  },
}).single("avatar");
