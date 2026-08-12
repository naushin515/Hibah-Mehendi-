import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderTracking } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';
import { validateOrderInput } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .post(protect, validateOrderInput, addOrderItems)
  .get(protect, admin, getOrders);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/tracking')
  .put(protect, admin, updateOrderTracking);

export default router;
