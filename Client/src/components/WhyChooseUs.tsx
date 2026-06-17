import { motion } from "framer-motion";
import { Award, Layers, ShieldCheck, Headset } from "lucide-react";

// Added icons to your data array to make the UI pop
const features = [
  {
    id: 1,
    title: "Premium Quality",
    description: "Carefully selected products designed to support a healthy lifestyle.",
    icon: Award,
  },
  {
    id: 2,
    title: "Wide Product Range",
    description: "Health care, personal care, home care and wellness products.",
    icon: Layers,
  },
  {
    id: 3,
    title: "Trusted Brand",
    description: "Committed to customer satisfaction and product excellence.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Customer Support",
    description: "Dedicated support to help customers with product information.",
    icon: Headset,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            We focus on quality, trust, and customer satisfaction.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                // Deep zinc card with the Indigo hover glow to match ProductCards
                className="group relative flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-zinc-900/80 hover:shadow-[0_10px_40px_rgba(99,102,241,0.15)]"
              >
                {/* Icon Container with Indigo Accents */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white group-hover:ring-indigo-500">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-indigo-300">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;