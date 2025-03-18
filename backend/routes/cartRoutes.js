const express = require("express");
const router = express.Router();
const { getCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const {protect} = require("../middleware/authMiddleware");

// Get cart items for a user
router.get("/:userId", protect, getCart);

// Update cart item quantity
router.patch("/update", protect, updateCartItem);

// Remove item from cart
router.delete("/remove/:itemId", protect, removeCartItem);

module.exports = router;
