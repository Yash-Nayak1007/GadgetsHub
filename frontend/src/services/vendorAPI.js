import axios from 'axios';

const API_URL = '/api/vendor';

// Add new product
export const addVendorProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData);
  return response.data;
};

// Get vendor stats
export const getVendorStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};

// Other API calls...