import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { ShieldAlert, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import { loginAdmin } from "../../services/admin.service";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginAdmin(email, password);
            localStorage.setItem("token", data.token);
            toast.success("Authentication Successful");
            navigate("/admin/dashboard");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Authentication Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8">
            {/* Deep Indigo Background Glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
                <div className="h-[600px] w-[600px] rounded-full bg-indigo-600/30 blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950/80 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10"
            >
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
                        <ShieldAlert size={32} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        System Access
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Enter your administrative credentials to proceed.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-2xl border border-zinc-800 bg-black/50 py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-zinc-900/50 focus:ring-1 focus:ring-indigo-500/50"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Lock size={18} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-zinc-800 bg-black/50 py-4 pl-12 pr-12 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-zinc-900/50 focus:ring-1 focus:ring-indigo-500/50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Authorize Entry"
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center text-xs text-zinc-600">
                    <p>Protected area. Unauthorized access is prohibited.</p>
                </div>
            </motion.div>
        </section>
    );
};

export default AdminLogin;