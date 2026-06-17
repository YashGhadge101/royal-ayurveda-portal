import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";

import AdminProducts from "../pages/admin/AdminProducts";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminInquiries from "../pages/admin/AdminInquiries";
import AdminCategories from "../pages/admin/AdminCategories";

import Profile from "../pages/customer/Profile";
import MyInquiries from "../pages/customer/MyInquiries";
import MyWishlist from "../pages/customer/MyWishlist";
import Auth from "../pages/customer/Auth";

import ProtectedRoute from "../components/ProtectedRoute";
import CustomerProtectedRoute from "../components/CustomerProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {/* AUTH PAGE - NO NAVBAR / FOOTER */}
            <Route path="/auth" element={<Auth />} />

            {/* MAIN WEBSITE */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />

                {/* PROTECTED CUSTOMER ROUTES */}
                <Route
                    path="/profile"
                    element={
                        <CustomerProtectedRoute>
                            <Profile />
                        </CustomerProtectedRoute>
                    }
                />

                <Route
                    path="/my-inquiries"
                    element={
                        <CustomerProtectedRoute>
                            <MyInquiries />
                        </CustomerProtectedRoute>
                    }
                />

                <Route
                    path="/my-wishlist"
                    element={
                        <CustomerProtectedRoute>
                            <MyWishlist />
                        </CustomerProtectedRoute>
                    }
                />
            </Route>

            {/* ADMIN LOGIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ADMIN PROTECTED ROUTES */}
            <Route
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/admin/products/edit/:id" element={<EditProduct />} />
                <Route path="/admin/inquiries" element={<AdminInquiries />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
            </Route>
            
        </Routes>
    );
};

export default AppRoutes;