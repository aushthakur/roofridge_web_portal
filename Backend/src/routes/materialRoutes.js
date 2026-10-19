const express = require('express');
const router = express.Router();
const {
  getCategories,
  getProducts,
  getProductById,
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/materialController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/categories', getCategories);
router.get('/products', getProducts);
router.get('/products/:idOrSlug', getProductById);

router.post('/orders', protect, createOrder);
router.get('/orders/my', protect, getUserOrders);
router.get('/orders', protect, authorize('admin', 'superadmin', 'materials_supplier'), getAllOrders);
router.put('/orders/:id/status', protect, authorize('admin', 'superadmin', 'materials_supplier'), updateOrderStatus);

module.exports = router;
