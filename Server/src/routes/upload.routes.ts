import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    const cleanName = file.originalname.replace(ext, "").replace(/[^a-zA-Z0-9]/g, "-");
    cb(null, `${Date.now()}-${cleanName}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file?.filename });
});

export default router;