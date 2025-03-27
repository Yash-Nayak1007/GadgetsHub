import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeartBroken, FaShoppingBag, FaTrash, FaSpinner } from 'react-icons/fa';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/wishlist');
        // console.log('API Response Data:', response.data); // Debug log

        // Enhanced response validation
        if (!response.data) {
          throw new Error('No data received from server');
        }

        // Handle both possible response structures
        let items = [];
        if (response.data.status === 'success') {
          items = response.data.data?.items || [];
        } else if (Array.isArray(response.data)) {
          items = response.data;
        } else if (response.data.items && Array.isArray(response.data.items)) {
          items = response.data.items;
        }

        if (!Array.isArray(items)) {
          throw new Error('Invalid wishlist data format');
        }

        setWishlistItems(items);
      } catch (error) {
        // console.error("Error fetching wishlist:", error);
        setError(
          error.response?.data?.message || 
          error.response?.data?.error || 
          error.message || 
          'Failed to load wishlist'
        );
        setWishlistItems([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      setRemoving(productId);
      const response = await axios.delete(`http://localhost:5000/api/wishlist/${productId}`);
      
      // Flexible success check
      if (response.status === 200 || response.data?.status === 'success') {
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
      } else {
        throw new Error(response.data?.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Failed to remove item'
      );
    } finally {
      setRemoving(null);
    }
  };

  const handleBrowseProducts = () => navigate('/products');

  const handleAddToCart = async (product) => {
    try {
      // Example implementation - adjust according to your API
      const response = await axios.post('http://localhost:5000/api/cart', {
        productId: product.productId,
        name: product.name,
        price: product.price,
        image: product.image
      });
      
      if (response.data?.status === 'success') {
        alert(`${product.name} added to cart!`);
      } else {
        throw new Error(response.data?.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Failed to add to cart'
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg">Loading your wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <FaHeartBroken className="text-4xl text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-center mb-2">Oops! Something went wrong</h2>
        <p className="text-red-500 text-center mb-6">{error}</p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Try Again
          </button>
          <button
            onClick={handleBrowseProducts}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <FaHeartBroken className="inline-block text-4xl text-pink-400 mb-4" />
            <p className="text-lg text-gray-600 mb-6">Your wishlist is empty</p>
            <button
              onClick={handleBrowseProducts}
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              <FaShoppingBag className="mr-2" />
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <motion.div
                  key={product.id || product.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = `https://robohash.org/${product._id}.png?set=set2`;
                        e.target.className = 'w-full h-48 object-cover bg-gray-200';
                      }}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.productId)}
                      disabled={removing === product.productId}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                      aria-label="Remove from wishlist"
                    >
                      {removing === product.productId ? (
                        <FaSpinner className="animate-spin text-red-500" />
                      ) : (
                        <FaTrash className="text-red-500" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-blue-600 font-bold text-xl mb-4">
                      ${product.price?.toFixed(2) || '0.00'}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                      <FaShoppingBag className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center text-gray-500">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in wishlist
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;