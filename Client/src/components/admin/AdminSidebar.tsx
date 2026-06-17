import {
    LayoutDashboard,
    Package,
    PlusCircle,
    LogOut,
    X,
    MessageSquare,
    FolderTree,
    ShieldAlert,
    ArrowLeft
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
            {/* ... Mobile Header and Overlay remain the same ... */}

            <aside className={`fixed bottom-0 left-0 top-0 z-50 w-64 border-r border-zinc-900 bg-black text-zinc-400 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0 shadow-[0_0_45px_rgba(168,85,247,0.15)]" : "-translate-x-full"}`}>
                
                {/* Brand Header */}
                <div className="flex h-20 items-center justify-between border-b border-zinc-900 px-6">
                    <Link to="/admin/dashboard" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
                        {/* Changed shield icon to Fuchsia to match the new vibe */}
                        <ShieldAlert size={28} className="text-fuchsia-500" />
                        MI Admin
                    </Link>
                    <button className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-900 hover:text-white lg:hidden" onClick={closeSidebar}>
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex h-[calc(100vh-5rem)] flex-col justify-between p-4">
                    <nav className="space-y-1.5">
                        <NavLink to="/admin/dashboard" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]" : "hover:bg-zinc-900 hover:text-white"}`}>
                            <LayoutDashboard size={20} /> Dashboard
                        </NavLink>
                        <NavLink to="/admin/products" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]" : "hover:bg-zinc-900 hover:text-white"}`}>
                            <Package size={20} /> Products
                        </NavLink>
                        <NavLink to="/admin/products/add" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]" : "hover:bg-zinc-900 hover:text-white"}`}>
                            <PlusCircle size={20} /> Add Product
                        </NavLink>
                        <div className="my-4 border-t border-zinc-900" />
                        <NavLink to="/admin/categories" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]" : "hover:bg-zinc-900 hover:text-white"}`}>
                            <FolderTree size={20} /> Categories
                        </NavLink>
                        <NavLink to="/admin/inquiries" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]" : "hover:bg-zinc-900 hover:text-white"}`}>
                            <MessageSquare size={20} /> Inquiries
                        </NavLink>
                    </nav>

                    {/* Bottom Action Area */}
                    <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <button
                            onClick={() => navigate("/")}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                        >
                            <ArrowLeft size={20} /> Back to Store
                        </button>

                        {/* Kept Logout Red for UX safety, but darkened the hover background slightly */}
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                        >
                            <LogOut size={20} /> Secure Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;