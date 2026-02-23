// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/prescriptions");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `prescription-${Date.now()}${path.extname(file.originalname)}`
//     );
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter(req, file, cb) {
//     const allowed = /jpg|jpeg|png|pdf/;
//     const ext = allowed.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     if (ext) cb(null, true);
//     else cb(new Error("Only images and PDF allowed"));
//   }
// });

// export default upload;


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "prescriptions",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    resource_type: "auto",
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;