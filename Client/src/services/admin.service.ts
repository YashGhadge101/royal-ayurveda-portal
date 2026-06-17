// Client/src/services/admin.service.ts

export const loginAdmin = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
};

export const getDashboardStats = async () => {
    const token = localStorage.getItem("token"); // Assuming you use 'token' for admin
    const response = await fetch("http://localhost:5000/api/admin/stats", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch stats");
    }
    return response.json();
};

export const getRecentProducts = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/admin/recent-products", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch recent products");
    }
    return response.json();
};