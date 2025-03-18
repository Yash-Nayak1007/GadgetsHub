const Cart = require("../models/Cart");
const Product = require("../models/Product"); // Assuming you have a Product model

// Get cart items for a specific user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  const { itemId, amount } = req.body;
  
  try {
    // Find the cart for the current user
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item to update
    const item = cart.items.find((item) => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity
    item.quantity += amount;

    if (item.quantity <= 0) {
      // Remove item if quantity is zero or less
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    }

    await cart.save();
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the cart for the current user
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove item from the cart
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCart, updateCartItem, removeCartItem };
