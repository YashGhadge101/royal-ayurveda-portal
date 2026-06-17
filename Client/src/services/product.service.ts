import type { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    "http://localhost:5000/api/products"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const addProduct = async (
  product: {
    name: string;
    category: string;
    image: string;
    description: string;
  }
) => {
  const response = await fetch(
    "http://localhost:5000/api/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await fetch(
    `http://localhost:5000/api/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
};

export const deleteProduct = async (
  id: number
) => {
  const response = await fetch(
    `http://localhost:5000/api/products/${id}`,
    {
      method: "DELETE",
    }
  );

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
  const response = await fetch(
    `http://localhost:5000/api/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

// Add this to your service file
export const updateFavoriteStatus = async (productId: number, isFavorite: boolean) => {
    const response = await fetch(`http://localhost:5000/api/favorites`, {
        method: "POST", // or PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, isFavorite }),
    });
    return response.json();
};

// Look at your service file - it should look like this:
export const getFavoriteStatus = async (productId: number) => {
    // You MUST include the token/user info here
    const token = localStorage.getItem("token"); // or wherever you store your auth
    
    const response = await fetch(`http://localhost:5000/api/favorites/${productId}`, {
        headers: {
            "Authorization": `Bearer ${token}` // THE SERVER NEEDS THIS TO FIND YOUR RECORD
        }
    });
    return response.json();
};
