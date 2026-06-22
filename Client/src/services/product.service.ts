import type { Product } from "../types/Product";

// Accessing the VITE_API_URL safely
const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const addProduct = async (product: {
  name: string;
  category: string;
  image: string;
  description: string;
}) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
};

export const updateProduct = async (
  id: number,
  product: {
    name: string;
    category: string;
    image: string;
    description: string;
  }
) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

export const updateFavoriteStatus = async (productId: number, isFavorite: boolean) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/favorites`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ productId, isFavorite }),
  });
  return response.json();
};

export const getFavoriteStatus = async (productId: number) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/api/favorites/${productId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response.json();
};