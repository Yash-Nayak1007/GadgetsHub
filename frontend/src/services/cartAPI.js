import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/cart";

export const getCart = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${userId}`);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (userId, product) => {
  try {
    const { data } = await axios.post(`${API_URL}/add`, {
      userId,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCartItem = async (itemId, amount) => {
  try {
    const { data } = await axios.patch(`${API_URL}/update`, {
      itemId,
      amount
    });
    return data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    await axios.delete(`${API_URL}/remove/${itemId}`);
    return true;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};
