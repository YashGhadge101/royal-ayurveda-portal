import { useEffect, useState } from "react";
import { getWishlist, removeWishlist } from "../../services/wishlist.service";
import type { Product } from "../../types/Product";
import toast from "react-hot-toast";
import { Trash2, Heart, Loader2 } from "lucide-react";

const MyWishlist = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId: number) => {
    try {
      await removeWishlist(productId);
      toast.success("Removed from Wishlist");
      loadWishlist(); 
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 min-h-screen text-zinc-100">
      <div className="flex items-center gap-4 mb-12">
        <div className="rounded-2xl bg-indigo-500/10 p-4 text-indigo-400 border border-indigo-500/20">
            <Heart size={28} />
        </div>
        <h1 className="text-4xl font-bold">My Wishlist</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-3xl bg-zinc-950">
            <p className="text-zinc-400">Your wishlist is currently empty.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg transition-all hover:border-indigo-500/50 hover:bg-zinc-900">
              <div className="mb-4 h-52 overflow-hidden rounded-2xl bg-black border border-zinc-800/50">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h2 className="mb-6 text-lg font-bold text-white line-clamp-1">{product.name}</h2>

              <button
                onClick={() => handleRemove(product.id)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-red-400 font-semibold transition hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={18} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;