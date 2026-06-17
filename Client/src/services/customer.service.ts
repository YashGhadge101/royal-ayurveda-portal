const API_URL = "http://localhost:5000/api/customers";

export const signupCustomer = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  referred_by?: string;
}) => {
  const response = await fetch(
    `${API_URL}/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const loginCustomer = async (data: {
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const getProfile = async () => {
  const token =
    localStorage.getItem(
      "customerToken"
    );

  const response = await fetch(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const updateProfile =
  async (data: {
    name: string;
    phone: string;
  }) => {
    const token =
      localStorage.getItem(
        "customerToken"
      );

    const response =
      await fetch(
        `${API_URL}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(
            data
          ),
        }
      );

    return response.json();
  };

export const changePassword =
  async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const token =
      localStorage.getItem(
        "customerToken"
      );

    const response =
      await fetch(
        `${API_URL}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(
            data
          ),
        }
      );

    return response.json();
  };

export const getMyInquiries =
  async () => {
    const token =
      localStorage.getItem(
        "customerToken"
      );

    const response =
      await fetch(
        "http://localhost:5000/api/inquiries/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.json();
  };