import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // console.log(product)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition relative overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-10 rounded-lg"></div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      {/* Product Info */}
      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-blue-600 font-bold text-xl">${product.price.toFixed(2)}</p>

      {/* View Details Button */}
      <button>
      <Link
        to={`/products/${product._id}`}
        className="block mt-3 text-center bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
      >
        View Details
      </Link>
      </button>
    </motion.div>
  );
};

export default ProductCard;
