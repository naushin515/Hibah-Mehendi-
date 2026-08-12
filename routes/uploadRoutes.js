import express from 'express';
import { upload } from '../utils/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } else {
    res.status(400).json({ message: 'No image provided' });
  }
});

export default router;
