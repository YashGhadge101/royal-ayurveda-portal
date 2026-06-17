const API_URL =
  "http://localhost:5000/api/wishlist";

export const addToWishlist =
  async (
    productId: number
  ) => {
    const token =
      localStorage.getItem(
        "customerToken"
      );

    const response =
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      });

    return response.json();
  };

export const getWishlist =
  async () => {
    const token =
      localStorage.getItem(
        "customerToken"
      );

    const response =
      await fetch(API_URL, {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });

    return response.json();
  };

export const removeWishlist =
  async (
    productId: number
  ) => {
    const token =
      localStorage.getItem(
        "customerToken"
      );

    const response =
      await fetch(
        `${API_URL}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.json();
  };