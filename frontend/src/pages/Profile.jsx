import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiEdit, FiSave, FiLogOut } from "react-icons/fi";

const Profile = () => {
  // Dummy User Data (Replace with API call later)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FiUser className="text-blue-500 text-6xl mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">My Profile</h1>

          {/* User Info */}
          <div className="mt-6">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="border p-2 rounded w-full"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            )}
          </div>

          {/* Edit & Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className={`mt-4 px-4 py-2 rounded-full text-white font-semibold shadow-md ${
              isEditing ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {isEditing ? <FiSave className="inline-block mr-2" /> : <FiEdit className="inline-block mr-2" />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </motion.button>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
          <OrderItem orderId="ORD123456" date="March 20, 2025" total="$184.98" status="Delivered" />
          <OrderItem orderId="ORD654321" date="March 10, 2025" total="$99.99" status="Shipped" />
        </motion.div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full w-full font-semibold shadow-md hover:scale-105 transition-transform flex items-center justify-center"
        >
          <FiLogOut className="mr-2" /> Logout
        </motion.button>
      </div>
    </div>
  );
};

// Order Item Component
const OrderItem = ({ orderId, date, total, status }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-4 rounded-lg shadow-md mt-4 hover:shadow-lg transition"
    >
      <h3 className="font-semibold">Order #{orderId}</h3>
      <p className="text-gray-600">Date: {date}</p>
      <p className="text-blue-600 font-bold">Total: {total}</p>
      <p className={`font-semibold ${status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>{status}</p>
    </motion.div>
  );
};

export default Profile;
