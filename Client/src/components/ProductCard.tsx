import type { Product } from "../types/Product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react"; 
import { useEffect, useState } from "react";
import { getFavoriteStatus } from "../services/product.service";
import { addToWishlist } from "../services/wishlist.service";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation(); 
        e.preventDefault();  

        const newState = !isFavorite;
        setIsFavorite(newState);

        try {
            await addToWishlist(product.id); 
            console.log("Successfully updated wishlist!");
        } catch (error) {
            console.error("Failed to update wishlist:", error);
            setIsFavorite(!newState); 
        }
    };

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const status = await getFavoriteStatus(product.id);
                setIsFavorite(!!status.isFavorite); 
            } catch (err) {
                console.error("Failed to fetch status");
            }
        };
        checkStatus();
    }, [product.id]);

    return (
        <Link to={`/products/${product.id}`} className="block h-full">
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                // THE FIX: Solid bg-zinc-950 so it never looks muddy. 
                // Added hover:-translate-y-2 for a smooth lift effect.
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:bg-black hover:shadow-[0_10px_40px_rgba(99,102,241,0.2)] cursor-pointer"
            >
                {/* Heart Button */}
                <button 
                    onClick={toggleFavorite}
                    className="absolute right-6 top-6 z-20 rounded-full border border-zinc-800 bg-zinc-900 p-2 transition-all hover:bg-black hover:scale-110"
                >
                    <Heart 
                        size={20} 
                        className={isFavorite ? "fill-indigo-500 text-indigo-500" : "text-zinc-500 group-hover:text-indigo-400"} 
                    />
                </button>

                {/* Product Image Container - Solid black background */}
                <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl bg-black border border-zinc-800/50">
                    <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="mb-3">
                        {/* Category Pill - Vibrant Indigo */}
                        <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 ring-1 ring-inset ring-indigo-500/40">
                            {product.category}
                        </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="mb-4 text-xl font-bold tracking-tight text-white line-clamp-2 transition-colors group-hover:text-indigo-300">
                        {product.name}
                    </h3>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;