export const createInquiry = async (
  inquiry: {
    product_name: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  }
) => {
  const token =
    localStorage.getItem(
      "customerToken"
    );

  const response = await fetch(
    "http://localhost:5000/api/inquiries",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify(
        inquiry
      ),
    }
  );

  return response.json();
};

export const getInquiries =
  async () => {
    const response =
      await fetch(
        "http://localhost:5000/api/inquiries"
      );

    return response.json();
  };

export const deleteInquiry =
  async (id: number) => {
    const response =
      await fetch(
        `http://localhost:5000/api/inquiries/${id}`,
        {
          method: "DELETE",
        }
      );

    return response.json();
  };