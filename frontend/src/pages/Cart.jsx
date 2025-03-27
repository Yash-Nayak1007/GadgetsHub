import React, { useEffect } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCart, updateCartItem, removeCartItem } from '../services/cartAPI';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await getCart(userId);
        setCartItems(cart);
      } catch (error) {
        toast.error('Failed to load cart', {
          position: "top-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [userId]);

  const handleUpdateQuantity = async (itemId, amount) => {
    try {
      await updateCartItem(itemId, amount);
      setCartItems(prev => 
        prev.map(item => 
          item._id === itemId 
            ? { ...item, quantity: item.quantity + amount } 
            : item
        ).filter(item => item.quantity > 0)
      );
    } catch (error) {
      toast.error('Failed to update quantity', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCartItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Item removed from cart', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('Failed to remove item', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-center text-gray-900 mb-6"
        >
          Your Shopping Cart
        </motion.h2>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/products'}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-700 mb-8"
            >
              You have <span className="text-blue-600 font-bold">{totalQuantity}</span> 
              {totalQuantity === 1 ? ' item' : ' items'} in your cart
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 sm:p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <img
                            src={item.image || 'https://via.placeholder.com/150'}
                            alt={item.name}
                            className="w-24 h-24 object-contain rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-blue-600 font-bold mt-1">
                              ${item.price?.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateQuantity(item._id, -1)}
                              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                            >
                              <FiMinus className="w-4 h-4" />
                            </motion.button>
                            <span className="text-lg font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateQuantity(item._id, 1)}
                              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                            >
                              <FiPlus className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveItem(item._id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-blue-600">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Proceed to Checkout
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;