import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {},
});

export default multer({ storage });
