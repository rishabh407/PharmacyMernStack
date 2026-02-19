import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/prescriptions");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf"
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Only JPG, PNG, PDF files are allowed"));
  } else {
    cb(null, true);
  }
};

const uploadPrescription = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

export default uploadPrescription;