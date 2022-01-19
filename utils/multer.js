import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpeg" && ext !== ".png" && ext !== ".jpg") {
      cb(new Error("file type is not supported"), false);
      return;
    }

    cb(null, true);
  },
});

export default upload;
