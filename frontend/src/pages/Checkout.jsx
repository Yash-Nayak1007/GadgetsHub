import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../services/orderAPI";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    const newOrder = await createOrder({
      user: user._id,
      products: cartItems.map((item) => ({ product: item.product._id, quantity: item.quantity })),
      totalAmount: totalPrice,
    });
    setLoading(false);

    if (newOrder) {
      setOrderPlaced(true);
      setTimeout(() => navigate("/orders"), 2000);
    } else {
      alert("Order failed!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        {orderPlaced ? (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-green-600">
            <FiCheckCircle className="text-5xl" />
            <h1 className="text-3xl font-bold mt-4">Order Placed!</h1>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
            <p className="text-blue-600 text-2xl font-bold">${totalPrice.toFixed(2)}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePlaceOrder} disabled={loading} className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md">
              {loading ? "Processing..." : <><FiShoppingBag className="mr-2" /> Place Order</>}
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;
