// api/api.js

export const BASE_URL = "http://localhost:9876/client/api/v1/";

export const apiList = {
  // AUTH APIS - Login , Register
  login: `${BASE_URL}auth/login`,
  register: `${BASE_URL}auth/register`,

  // Category
  getAllCategory: `${BASE_URL}category/all`,

  // Product
  createProduct: `${BASE_URL}product/create`,
  getProductById: (productId) => `${BASE_URL}product/${productId}`,
  getAllProduct: `${BASE_URL}product/all`,
  updateProduct: (productId) => `${BASE_URL}product/update/${productId}`,
  deleteProduct: (productId) => `${BASE_URL}product/delete/${productId}`,
};
