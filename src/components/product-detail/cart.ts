import axios from "axios";

const API_URL = "http://localhost:5000";

export interface CartItem {
  product_variant_id: number | string;
  user_id: string;
  name: string;
  amount: number;
  quantity: number;
  image: string;
  description?: string;
  details?: { key: string; label: string; content: string }[];
  gallery?: string[];
}

export const addToCartAPI = async (userId: string, product: CartItem) => {
  const response = await axios.post(`${API_URL}/cart/add`, { userId, product });
  return response.data;
};

export const getCartAPI = async (userId: string) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return response.data;
};

export const removeFromCartAPI = async (
  userId: string,
  productId: number | string,
) => {
  const response = await axios.post(`${API_URL}/cart/remove`, {
    userId,
    productId,
  });
  return response.data;
};
