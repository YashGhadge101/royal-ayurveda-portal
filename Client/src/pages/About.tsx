import { motion } from "framer-motion";
import { Target, Users, ShieldCheck, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black pt-32 pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Empowering Wellness, <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Creating Opportunity.</span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400">
            At MI Business, we bridge the gap between premium quality wellness products and the people who need them most through a trusted direct-selling network.
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="p-10 rounded-[2.5rem] border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
            <Target className="text-indigo-400 mb-6" size={40} />
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-zinc-400 leading-relaxed">
              To provide high-quality, scientifically backed health and lifestyle products to every home, while creating sustainable income opportunities for our network of independent partners.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20">
            <TrendingUp className="text-violet-400 mb-6" size={40} />
            <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-zinc-300 leading-relaxed">
              To become the leading platform for personal wellness and entrepreneurship, fostering a community of success, health, and financial freedom.
            </p>
          </div>
        </div>

        {/* What Defines Us */}
        <div className="py-20 border-t border-zinc-900">
          <h2 className="text-3xl font-bold text-white text-center mb-16">What Defines Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Uncompromising Quality", desc: "Every product meets the highest standards of safety and efficacy." },
              { icon: Users, title: "Partner First", desc: "We support our distributors with training, tools, and a transparent model." },
              { icon: Target, title: "Ethical Business", desc: "Integrity is the core of everything we build and sell." }
            ].map((item, idx) => (
              <div key={idx} className="text-center group p-6 rounded-3xl transition-all hover:bg-zinc-900/30">
                <item.icon className="mx-auto text-indigo-400 mb-6 transition-transform group-hover:scale-110" size={48} />
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;