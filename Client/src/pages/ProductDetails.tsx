import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Heart, Send, Loader2, Info } from "lucide-react";
import type { Product } from "../types/Product";
import { getProductById } from "../services/product.service";
import { createInquiry } from "../services/inquiry.service";
import { addToWishlist } from "../services/wishlist.service";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const customerToken = localStorage.getItem("customerToken");
  const customer = localStorage.getItem("customer");
  const customerData = customer ? JSON.parse(customer) : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  const handleWishlist = async () => {
    if (!customerToken) { toast.error("Please login first"); navigate("/login"); return; }
    if (!product) return;
    try {
      const data = await addToWishlist(product.id);
      toast.success(data.message || "Added To Wishlist");
    } catch (error) { toast.error("Failed To Add Wishlist"); }
  };

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerToken) { toast.error("Please login first"); navigate("/login"); return; }
    if (!product) return;
    try {
      await createInquiry({ product_name: product.name, name: customerData?.name || "", email: customerData?.email || "", phone: customerData?.phone || "", message });
      toast.success("Inquiry Submitted");
      setMessage("");
    } catch (error) { toast.error("Failed to submit"); }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>;
  if (!product) return <div className="py-20 text-center text-white">Product Not Found</div>;

  return (
    <section className="py-24 bg-black min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Details Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-12 md:grid-cols-2 bg-zinc-950 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center justify-center bg-black rounded-3xl border border-zinc-800">
            <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="max-h-96 object-contain p-8" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1 text-indigo-400 border border-indigo-500/20 text-sm font-medium w-max">{product.category}</span>
            <h1 className="mt-4 text-4xl font-bold">{product.name}</h1>
            <p className="mt-6 text-zinc-400 leading-relaxed">{product.description}</p>
            <button
              onClick={handleWishlist}
              className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-black border border-zinc-700 px-8 py-3 font-semibold hover:bg-zinc-900 transition w-max"
            >
              <Heart size={18} className="text-indigo-400" /> Add To Wishlist
            </button>
          </div>
        </motion.div>

        {/* Inquiry Section */}
        <div className="mt-10 rounded-[2.5rem] border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="mb-6 text-2xl font-bold flex items-center gap-2"><Info className="text-indigo-400" /> Interested In This Product?</h2>
          {!customerToken ? (
            <button onClick={() => navigate("/login")} className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 text-white font-semibold">Login to Inquire</button>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-4">
              <div className="rounded-2xl bg-black p-6 border border-zinc-800 text-zinc-400">
                <p><strong>Name:</strong> {customerData?.name}</p>
                <p><strong>Email:</strong> {customerData?.email}</p>
              </div>
              <textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-zinc-800 bg-black p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <button type="submit" className="rounded-2xl bg-indigo-600 px-8 py-3 text-white font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
                <Send size={18} /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;