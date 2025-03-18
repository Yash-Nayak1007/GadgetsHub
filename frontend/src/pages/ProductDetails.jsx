import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { getProductById } from "../services/productAPI";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
console.log(id)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);  // assuming the API returns the product data
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500 py-20">Loading product details...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Product Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-blue-600 text-xl font-semibold mt-2">${product.price}</p>
          <div className="flex items-center text-yellow-500 mt-2">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={i < Math.round(product.rating) ? "fill-current" : "opacity-50"} />
            ))}
            <span className="ml-2 text-gray-600">{product.rating}/5</span>
          </div>
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <FiShoppingCart /> Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
