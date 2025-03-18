import axios from "axios";

// Set your backend API base URL
const API_URL = "http://your-backend-url.com/api/cart"; 

// Function to get cart items
export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Returns cart data
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// Function to update the quantity of a cart item
export const updateCartItem = async (itemId, amount) => {
  try {
    const response = await axios.patch(`${API_URL}/update`, {
      itemId,
      amount
    });
    return response.data; // Returns updated cart item data
  } catch (error) {
    console.error("Error updating cart item:", error);
    return null;
  }
};

// Function to remove an item from the cart
export const removeCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/remove/${itemId}`);
    return response.data.success; // Returns a success status (true/false)
  } catch (error) {
    console.error("Error removing cart item:", error);
    return false;
  }
};
