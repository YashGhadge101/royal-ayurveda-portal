export const getRecentProducts =
  async () => {
    const response = await fetch(
      "http://localhost:5000/api/admin/recent-products"
    );

    return response.json();
  };

  export const getCategoryStats =
  async () => {
    const response = await fetch(
      "http://localhost:5000/api/admin/category-stats"
    );

    return response.json();
  };