import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Menu, Bell, Search, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-zinc-950 font-sans text-zinc-100">
            {/* The persistent Sidebar */}
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content Wrapper - Takes up remaining space */}
            <div className="flex min-h-screen flex-1 flex-col transition-all duration-300 lg:ml-64">
                
                {/* Professional Top Header */}
                <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-zinc-800/60 bg-black/80 px-6 backdrop-blur-xl">
                    
                    {/* Left Side: Mobile Menu & Search */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Toggle Button */}
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Admin Search Bar (Hidden on Mobile) */}
                        <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 transition-all focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 lg:flex">
                            <Search size={18} className="text-zinc-500" />
                            <input 
                                type="text" 
                                placeholder="Search admin..." 
                                className="w-64 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Side Actions: Notifications & Profile */}
                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-indigo-400">
                            <Bell size={20} />
                            {/* Notification Dot */}
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]"></span>
                        </button>
                        
                        <div className="h-8 w-px bg-zinc-800"></div>
                        
                        <button className="flex items-center gap-2 rounded-full p-1 text-zinc-400 transition-colors hover:text-white">
                            <UserCircle size={28} className="text-indigo-400" />
                            <span className="hidden text-sm font-medium lg:block">Admin User</span>
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Framer Motion wraps the Outlet so navigating between admin pages animates smoothly */}
                    <motion.div
                        key={location.pathname} // Triggers animation on route change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto max-w-7xl"
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>

            {/* Mobile Overlay - Closes sidebar when clicking outside of it */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;