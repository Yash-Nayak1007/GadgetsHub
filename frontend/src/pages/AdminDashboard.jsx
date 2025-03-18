import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../services/orderAPI";
import { motion } from "framer-motion";
import { FiClipboard, FiCheckCircle, FiXCircle } from "react-icons/fi";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/"); // Redirect if not an admin
    } else {
      const fetchOrders = async () => {
        const data = await getOrders();
        setOrders(data);
      };
      fetchOrders();
    }
  }, [user, navigate]);

  const handleUpdateStatus = async (id, status) => {
    const updatedOrder = await updateOrderStatus(id, status);
    if (updatedOrder) {
      setOrders(orders.map((order) => (order._id === id ? updatedOrder : order)));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        {/* Dashboard Summary */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
            <FiClipboard className="text-blue-500 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <p className="text-gray-600">{orders.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Order Management Table */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Orders</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <motion.tr
                  key={order._id}
                  className="border-t hover:bg-gray-100 transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.user}</td>
                  <td className="p-3">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.status === "Shipped"
                          ? "bg-blue-500"
                          : order.status === "Delivered"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      className="border p-2 rounded"
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
