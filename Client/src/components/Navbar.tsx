import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    UserCircle,
    LogOut,
    User,
    Heart,
    MessageSquare,
    ShieldCheck
} from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const customerToken = localStorage.getItem("customerToken");

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleLogout = () => {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("customer");
        setIsOpen(false);
        setIsProfileOpen(false);
        navigate("/");
    };

    const closeMobileMenu = () => setIsOpen(false);

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-xl transition-transform duration-500 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                
                <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-white tracking-tight" onClick={closeMobileMenu}>
                    <ShieldCheck size={28} className="text-fuchsia-500" />
                    MI Business
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-8 font-semibold text-zinc-400 md:flex">
                    <Link to="/" className="transition-colors hover:text-fuchsia-400">Home</Link>
                    <Link to="/about" className="transition-colors hover:text-fuchsia-400">About</Link>
                    <Link to="/products" className="transition-colors hover:text-fuchsia-400">Products</Link>
                    <Link to="/contact" className="transition-colors hover:text-fuchsia-400">Contact</Link>

                    {!customerToken ? (
                        <div className="flex items-center gap-4 border-l border-zinc-800 pl-8">
                            <Link to="/auth" className="rounded-xl px-5 py-2.5 text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white">Login</Link>
                            <Link to="/auth" className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all hover:brightness-110 active:scale-95">Become a Partner</Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6 border-l border-zinc-800 pl-8">
                            <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                                <button className="flex items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-fuchsia-400 pt-1">
                                    <UserCircle size={36} strokeWidth={1.5} />
                                </button>
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                                        >
                                            <Link to="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-purple-500/10 hover:text-fuchsia-400"><User size={18} /> My Profile</Link>
                                            <Link to="/my-wishlist" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-purple-500/10 hover:text-fuchsia-400"><Heart size={18} /> Wishlist</Link>
                                            <Link to="/my-inquiries" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-purple-500/10 hover:text-fuchsia-400"><MessageSquare size={18} /> My Inquiries</Link>
                                            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-500/10"><LogOut size={18} /> Logout</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    <Link to="/admin/login" className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-white transition-colors hover:border-purple-500/50 hover:bg-zinc-800">Admin</Link>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-zinc-900 bg-zinc-950 md:hidden"
                    >
                        <div className="flex flex-col space-y-2 p-6 text-lg font-semibold text-zinc-300">
                            <Link to="/" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 hover:bg-zinc-900 hover:text-fuchsia-400">Home</Link>
                            <Link to="/about" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 hover:bg-zinc-900 hover:text-fuchsia-400">About</Link>
                            <Link to="/products" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 hover:bg-zinc-900 hover:text-fuchsia-400">Products</Link>
                            <Link to="/contact" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 text-fuchsia-400 hover:bg-zinc-900">Contact Us</Link>

                            <div className="my-2 border-t border-zinc-900" />
                            
                            {!customerToken ? (
                                <>
                                    <Link to="/auth" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 hover:bg-zinc-900 hover:text-white">Login</Link>
                                    <Link to="/auth" onClick={closeMobileMenu} className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 text-center text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]">Become a Partner</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/profile" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 hover:bg-zinc-900 hover:text-fuchsia-400">My Profile</Link>
                                    <Link to="/my-wishlist" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 hover:bg-zinc-900 hover:text-fuchsia-400">Wishlist</Link>
                                    <button onClick={handleLogout} className="rounded-xl px-4 py-3 text-left text-red-500 hover:bg-red-500/10">Logout</button>
                                </>
                            )}
                            <Link to="/admin/login" onClick={closeMobileMenu} className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-center text-white hover:border-purple-500/50">Admin</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;