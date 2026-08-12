import express from 'express';
import { registerUser, authUser, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateRegisterInput, validateLoginInput } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegisterInput, registerUser);
router.post('/login', validateLoginInput, authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
