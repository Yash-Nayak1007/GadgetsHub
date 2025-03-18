import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FiTrash, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCart, updateCartItem, removeCartItem } from "../services/cartAPI";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const data = await getCart(user._id);
        setCartItems(data);
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const updateQuantity = async (id, amount) => {
    const updatedItem = await updateCartItem(id, amount);
    if (updatedItem) {
      setCartItems(cartItems.map((item) => (item._id === id ? updatedItem : item)));
    }
  };

  const removeItem = async (id) => {
    const success = await removeCartItem(id);
    if (success) {
      setCartItems(cartItems.filter((item) => item._id !== id));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 bg-white p-6 rounded-lg shadow-md"
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between border-b py-4"
                >
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-blue-600 font-bold">${item.product.price.toFixed(2)}</p>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item._id, -1)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                      <FiMinus />
                    </button>
                    <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                      <FiPlus />
                    </button>
                  </div>
                  {/* Remove Button */}
                  <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700">
                    <FiTrash size={20} />
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              <div className="flex justify-between mt-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800 font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                state={{ cartItems, totalPrice }}
                className="block mt-6 bg-blue-500 text-white px-6 py-3 rounded-full text-center font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
