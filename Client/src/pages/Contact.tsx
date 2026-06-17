import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-black min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl px-6"
      >
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-zinc-400">
            Have questions? Send us a message and we will get back to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Enter your name" },
            { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
            { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number" },
          ].map((field) => (
            <div key={field.name} className="mb-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                required={field.name !== "phone"}
              />
            </div>
          ))}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">Message</label>
            <textarea
              name="message"
              rows={5}
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Message</>}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;