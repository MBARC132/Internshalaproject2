import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addToCart, updateCartItem, removeCartItem } from '../controllers/cartController.js';
const router = express.Router();

router.post('/', protect, addToCart);
router.put('/:productId', protect, updateCartItem);
router.delete('/:productId', protect, removeCartItem);

export default router;
