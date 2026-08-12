import express from 'express';
import { getBanner, updateTextBanner, updatePosterBanner } from '../controllers/bannerController.js';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBanner);
router.put('/text', protect, admin, updateTextBanner);
router.put('/poster', protect, admin, upload.single('image'), updatePosterBanner);

export default router;
