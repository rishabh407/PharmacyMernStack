import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/prescriptions");
  },
  filename(req, file, cb) {
    cb(
      null,
      `prescription-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const allowed = /jpg|jpeg|png|pdf/;
    const ext = allowed.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (ext) cb(null, true);
    else cb(new Error("Only images and PDF allowed"));
  }
});

export default upload;