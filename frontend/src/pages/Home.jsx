import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const carouselImages = [
    {
      src: "/src/assets/one.jpg",
      alt: "Wireless Headphones - Ultimate Sound Experience",
    },
    {
      src: "/src/assets/two.jpg",
      alt: "Latest Smartphones - Cutting-Edge Technology",
    },
    {
      src: "/src/assets/three.jpg",
      alt: "VR Gaming - Step into the Future",
    },
    {
      src: "/src/assets/four.jpg",
      alt: "Advanced VR Headsets - Next Level Immersion",
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      _id: "1",
      name: "Smartwatch Series X",
      price: 129.99,
      description: "Advanced smartwatch with health monitoring and GPS tracking",
      image: "https://cdn.pixabay.com/photo/2019/10/02/06/43/smartwatch-4518536_1280.jpg",
      category: "wearables",
    },
    {
      id: 2,
      _id: "2",
      name: "Wireless Earbuds Pro",
      price: 89.99,
      description: "Premium noise-cancelling wireless earbuds with 24h battery",
      image: "https://cdn.pixabay.com/photo/2020/02/22/17/22/headphones-4878176_1280.jpg",
      category: "audio",
    },
    {
      id: 3,
      _id: "3",
      name: "4K Action Camera",
      price: 199.99,
      description: "Waterproof action camera with 4K/60fps video recording",
      image: "https://cdn.pixabay.com/photo/2016/11/29/11/15/action-1867171_1280.jpg",
      category: "cameras",
    },
    {
      id: 4,
      _id: "4",
      name: "Gaming Mouse RGB",
      price: 49.99,
      description: "High-precision gaming mouse with customizable RGB lighting",
      image: "https://cdn.pixabay.com/photo/2017/07/11/18/31/mouse-2499700_1280.jpg",
      category: "accessories",
    },
    {
      id: 5,
      _id: "5",
      name: "Portable Bluetooth Speaker",
      price: 59.99,
      description: "Waterproof Bluetooth speaker with 20h playtime",
      image: "https://cdn.pixabay.com/photo/2018/07/21/05/14/bluetooth-3553871_1280.jpg",
      category: "audio",
    },
  ];

  const saleProducts = [
    {
      id: 6,
      _id: "6",
      name: "Latest 5G Smartphone",
      oldPrice: 999.99,
      price: 799.99,
      description: "Flagship smartphone with 5G, 120Hz display, and triple camera",
      image: "https://cdn.pixabay.com/photo/2021/09/07/13/08/iphone-6604385_1280.jpg",
      category: "phones",
    },
    {
      id: 7,
      _id: "7",
      name: "Gaming Console Pro",
      oldPrice: 599.99,
      price: 499.99,
      description: "Next-gen gaming console with 4K HDR and ray tracing",
      image: "https://cdn.pixabay.com/photo/2020/08/19/13/12/controller-5501621_1280.jpg",
      category: "gaming",
    },
    {
      id: 8,
      _id: "8",
      name: "VR Headset",
      oldPrice: 349.99,
      price: 249.99,
      description: "Immersive VR headset with 6DOF tracking and controllers",
      image: "https://cdn.pixabay.com/photo/2017/07/07/13/18/vr-2481974_1280.jpg",
      category: "gaming",
    },
    {
      id: 9,
      _id: "9",
      name: "Smart Home Hub",
      oldPrice: 199.99,
      price: 149.99,
      description: "Control your smart home devices with voice commands",
      image: "https://cdn.pixabay.com/photo/2018/01/17/07/49/alexa-3082435_1280.jpg",
      category: "smart-home",
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Carousel Section */}
      <section className="relative w-full h-[30vh] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 to-transparent z-10" />
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          className="relative z-0"
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="relative w-full h-[30vh] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform -skew-y-6"
              />
              <div className="absolute bottom-5 left-5 text-white z-20">
                <h2 className="text-xl md:text-2xl font-bold">{image.alt}</h2>
                <button 
                  className="mt-2 bg-blue-500 px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">🔥 Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={() => navigate(`/product/${product.id}`, { state: { product } })}
            />
          ))}
        </div>
      </section>

      {/* Sale Products */}
      <section className="container mx-auto py-12 px-6 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 text-white rounded-lg">
        <h2 className="text-3xl font-bold text-center">💥 Limited Time Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {saleProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={() => navigate(`/product/${product.id}`, { state: { product } })}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Electronics", icon: "📱", category: "electronics" },
            { name: "Audio", icon: "🎧", category: "audio" },
            { name: "Wearables", icon: "⌚", category: "wearables" },
            { name: "Gaming", icon: "🎮", category: "gaming" },
          ].map((cat) => (
            <motion.div
              key={cat.category}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(cat.category)}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer"
            >
              <span className="text-4xl mb-2 block">{cat.icon}</span>
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
