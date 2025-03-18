import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Discover the Latest Accessories & Gadgets
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-lg"
        >
          Explore top-quality gadgets and accessories at unbeatable prices.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <Link
            to="/products"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Featured Products
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Sample Featured Products */}
          <ProductCard
            title="Wireless Earbuds"
            image="https://via.placeholder.com/200"
            price="$49.99"
          />
          <ProductCard
            title="Smartwatch Pro"
            image="https://via.placeholder.com/200"
            price="$129.99"
          />
          <ProductCard
            title="Gaming Headset"
            image="https://via.placeholder.com/200"
            price="$89.99"
          />
        </motion.div>
      </section>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ title, image, price }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
    >
      <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-blue-600 font-bold">{price}</p>
      <Link
        to="/products"
        className="block mt-2 text-center bg-blue-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default Home;
