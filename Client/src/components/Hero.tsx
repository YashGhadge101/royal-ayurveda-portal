import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp, Users, Award } from "lucide-react";

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden bg-black pt-24 pb-32 lg:pt-36">
      {/* Decorative background blur - Royal Purple Glow */}
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute top-1/2 -left-24 h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[100px]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left Side: Copy & CTA */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-semibold text-purple-400">
                <ShieldCheck size={16} /> Verified Direct Selling
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl">
              Elevate Your <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Lifestyle</span> With Premium Wellness.
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-zinc-400">
              Join thousands of distributors and customers. Explore quality health, personal care, and agricultural products designed to support a better everyday life and a stronger financial future.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95"
              >
                Explore Products 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/auth"
                className="flex items-center gap-2 rounded-2xl border-2 border-zinc-800 bg-transparent px-8 py-4 font-semibold text-white transition-all hover:border-purple-500 hover:bg-purple-500/10 active:scale-95"
              >
                Become a Partner
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-14 flex items-center gap-8 border-t border-zinc-800 pt-8 sm:gap-12">
              <div>
                <h3 className="text-3xl font-bold text-white">100+</h3>
                <p className="mt-1 text-sm font-medium text-zinc-500">Premium Products</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">5+</h3>
                <p className="mt-1 text-sm font-medium text-zinc-500">Categories</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-fuchsia-400">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">10k+</h3>
                  <p className="mt-1 text-sm font-medium text-zinc-500">Active Partners</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Abstract Floating Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Deep Portal Glow Effect */}
            <div className="relative flex h-[600px] w-full items-center justify-center rounded-[3rem] border border-purple-500/20 bg-gradient-to-br from-purple-900 via-fuchsia-900/40 to-black shadow-[0_0_60px_rgba(168,85,247,0.2)]">
              
              {/* Floating Badge 1 - Top Left */}
              <motion.div 
                animate={{ y: [-15, 15, -15] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-32 flex items-center gap-4 rounded-2xl border border-purple-500/30 bg-black/60 px-6 py-4 text-white shadow-xl backdrop-blur-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-200">Network Growth</p>
                  <p className="text-lg font-bold text-white">+24% This Month</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div 
                animate={{ y: [15, -15, 15] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-32 flex items-center gap-4 rounded-2xl border border-fuchsia-500/30 bg-black/60 px-6 py-4 text-white shadow-xl backdrop-blur-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-400">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-200">Quality Assured</p>
                  <p className="text-lg font-bold text-white">100% Premium</p>
                </div>
              </motion.div>

              {/* Main Center Text */}
              <div className="relative z-10 text-center text-white">
                <ShieldCheck size={80} className="mx-auto mb-4 text-fuchsia-400 opacity-90" />
                <p className="text-3xl font-bold tracking-tight">MI Business Portal</p>
                <p className="mt-2 text-lg text-purple-200">Quality Meets Opportunity</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;