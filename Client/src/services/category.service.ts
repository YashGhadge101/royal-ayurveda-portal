export const getCategories =
  async () => {
    const response =
      await fetch(
        "http://localhost:5000/api/categories"
      );

    return response.json();
  };

export const addCategory = async (name: string) => {
    const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    
    // This will tell us if there's a network error
    if (!response.ok) {
        console.error("Network response was not ok");
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const deleteCategory =
  async (id: number) => {
    const response =
      await fetch(
        `http://localhost:5000/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

    return response.json();
  };