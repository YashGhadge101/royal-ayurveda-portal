import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { loginCustomer, signupCustomer } from "../../services/customer.service";

// --- REUSABLE INPUT COMPONENT ---
type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
};

const AuthInput: React.FC<AuthInputProps> = ({ icon, rightElement, ...props }) => (
  <div className="relative w-full">
    {icon && <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-white/60">{icon}</div>}
    <input
      {...props}
      className={`w-full border-0 border-b border-white/35 bg-transparent py-3 text-sm text-white outline-none transition-all placeholder:text-white/45 focus:border-purple-400 ${icon ? "pl-8" : ""} ${rightElement ? "pr-10" : ""}`}
    />
    {rightElement && <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/65">{rightElement}</div>}
  </div>
);

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", referredBy: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setShowPass(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const data = await loginCustomer({ email: formData.email, password: formData.password });
        localStorage.setItem("customerToken", data.token);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        await signupCustomer({ ...formData, referred_by: formData.referredBy } as any);
        toast.success("Account created!");
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-black p-4">
      {/* Container with Purple Glow */}
      <div className="relative h-[560px] w-full max-w-5xl overflow-hidden rounded-[28px] border border-purple-500/30 bg-black shadow-[0_0_45px_rgba(168,85,247,0.15)]">
        
        {/* Diagonal Animated Panel (Purple to Fuchsia Gradient) */}
        <motion.div
          className="absolute inset-0 z-20 bg-gradient-to-br from-purple-500 via-fuchsia-800 to-black"
          initial={false}
          animate={{ clipPath: isLogin ? "polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 72% 50%)" : "polygon(0 0, 50% 0, 28% 50%, 50% 100%, 0 100%)" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        />

        {/* Login Form */}
        <motion.div
          className="absolute left-0 top-0 z-30 flex h-full w-1/2 items-center justify-center px-12"
          animate={{ opacity: isLogin ? 1 : 0, x: isLogin ? 0 : -80, pointerEvents: isLogin ? "auto" : "none" }}
          transition={{ duration: 0.45 }}
        >
          <div className="w-full max-w-sm">
            <h1 className="mb-8 text-4xl font-bold text-white">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon={<Mail size={17} />} required />
              <AuthInput type={showPass ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} icon={<Lock size={17} />} required rightElement={
                <button type="button" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={17} /> : <Eye size={17} />}</button>} 
              />
              <button type="submit" disabled={loading} className="mt-3 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
              </button>
              <p className="text-center text-sm text-white/60">
                Don't have an account?{" "}
                <button type="button" onClick={switchMode} className="font-semibold text-purple-400 hover:text-purple-300">
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          className="absolute right-0 top-0 z-30 flex h-full w-1/2 items-center justify-center px-12"
          animate={{ opacity: isLogin ? 0 : 1, x: isLogin ? 80 : 0, pointerEvents: isLogin ? "none" : "auto" }}
          transition={{ duration: 0.45 }}
        >
          <div className="w-full max-w-sm">
            <h1 className="mb-6 text-4xl font-bold text-white">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput name="name" placeholder="Business Name" value={formData.name} onChange={handleInputChange} icon={<User size={17} />} required />
              <AuthInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} icon={<Mail size={17} />} required />
              <AuthInput name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} icon={<Phone size={17} />} required />
              <AuthInput name="referredBy" placeholder="Referral Code (Optional)" value={formData.referredBy} onChange={handleInputChange} icon={<BadgeCheck size={17} />} />
              <AuthInput type={showPass ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} icon={<Lock size={17} />} required rightElement={
                <button type="button" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={17} /> : <Eye size={17} />}</button>} 
              />
              <button type="submit" disabled={loading} className="mt-3 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Sign Up"}
              </button>
              <p className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <button type="button" onClick={switchMode} className="font-semibold text-purple-400 hover:text-purple-300">
                  Login
                </button>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Text Overlay */}
        <motion.div
          className={`absolute top-0 z-40 flex h-full w-1/2 items-center justify-center px-12 text-center text-white ${isLogin ? "right-0" : "left-0"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>
            <h2 className="text-4xl font-black uppercase">{isLogin ? "New Here?" : "Welcome Back!"}</h2>
            <p className="mt-5 text-sm leading-6 text-white/80">
              {isLogin ? "Create your account to start managing your dashboard." : "Already have an account? Log in and continue."}
            </p>
            <button onClick={switchMode} className="mt-8 rounded-full border border-white/50 px-8 py-2 text-sm font-semibold hover:bg-white hover:text-purple-900 transition-all">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Auth;