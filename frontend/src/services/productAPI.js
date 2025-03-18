import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data?.message || error.message);
    return [];
  }
};

// Add a new product (Admin Only)
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response?.data?.message || error.message);
    return null;
  }
};

// Update a product (Admin Only)
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a product (Admin Only)
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return true;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data?.message || error.message);
    return false;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error.response?.data?.message || error.message);
    return null;
  }
};