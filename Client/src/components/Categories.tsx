import { motion } from "framer-motion";
import { HeartPulse, Sparkles, Home, Coffee, Sprout } from "lucide-react";

// Updated colors to look premium on dark mode (opacity-based backgrounds)
const categories = [
  { id: 1, name: "Health Care", icon: HeartPulse, color: "text-rose-400", bg: "bg-rose-500/10" },
  { id: 2, name: "Personal Care", icon: Sparkles, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
  { id: 3, name: "Home Care", icon: Home, color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: 4, name: "Food & Beverage", icon: Coffee, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: 5, name: "Agro Care", icon: Sprout, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const Categories = () => {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Discover our wide range of premium lifestyle solutions.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                // Royal Ayurveda Hover States
                className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 text-center transition-all hover:border-purple-500/50 hover:bg-zinc-900 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
              >
                {/* Icon transforms to Purple/Fuchsia gradient on hover */}
                <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${category.bg} ${category.color} transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white group-hover:shadow-lg`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-zinc-300 transition-colors group-hover:text-white">
                  {category.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Categories;