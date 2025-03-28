const express = require('express');
const router = express.Router();
const {
  getVendorProducts,
  getVendorProduct,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct
} = require('../controllers/vendorProductController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getVendorProducts)
  .post(protect, createVendorProduct);

router.route('/:id')
  .get(protect, getVendorProduct)
  .put(protect, updateVendorProduct)
  .delete(protect, deleteVendorProduct);

module.exports = router;