import express from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// ✅ upload-image MUST be before /:id
router.post('/upload-image', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file received' });
    const result = await uploadToCloudinary(req.file.buffer);
    res.status(201).json({ public_id: result.public_id, secure_url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed: ' + error.message });
  }
});

router.route('/').get(getProducts).post(protect, admin, upload.array('images', 5), createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/:id')
  .put(protect, admin, upload.array('images', 5), updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
