import express from 'express';
import { submitMessage, getMessages, markAsRead, deleteMessage } from '../controllers/messageController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitMessage);                          // public
router.get('/', protect, admin, getMessages);            // admin only
router.put('/:id/read', protect, admin, markAsRead);     // admin only
router.delete('/:id', protect, admin, deleteMessage);    // admin only

export default router;
