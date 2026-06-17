import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, PackageX, SlidersHorizontal, LayoutGrid } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/Product";

const Products = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name-asc");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = ["All", "Health Care", "Personal Care", "Home Care", "Food & Beverage", "Agro Care"];

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const dbCat = (product.category || "").replace(/\s+/g, "").toLowerCase();
            const selCat = selectedCategory.replace(/\s+/g, "").toLowerCase();
            const matchesCategory = selectedCategory === "All" || dbCat.includes(selCat);
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));
        return result;
    }, [products, search, selectedCategory, sortBy]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, []);

    return (
        <section className="min-h-screen bg-black pt-24 pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Our Catalog</h1>
                    <p className="text-zinc-400">Discover premium wellness products curated for you.</p>
                </div>

                {/* Control Bar */}
                <div className="mb-12 rounded-[2rem] bg-zinc-950 p-6 border border-zinc-800 shadow-2xl">
                    <div className="flex flex-col gap-6">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                className="w-full rounded-2xl border border-zinc-800 bg-black py-4 pl-12 pr-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50" 
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-6">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                                            selectedCategory === category 
                                            ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" 
                                            : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-zinc-400">
                                <SlidersHorizontal size={18} />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-3 pr-8 text-sm text-white outline-none focus:border-indigo-500"
                                >
                                    <option value="name-asc">A to Z</option>
                                    <option value="name-desc">Z to A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex min-h-[40vh] flex-col items-center justify-center text-indigo-500">
                        <Loader2 className="h-12 w-12 animate-spin mb-4" />
                        <p className="font-medium text-zinc-500">Loading catalog...</p>
                    </div>
                ) : (
                    <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full flex flex-col items-center py-20 text-zinc-500">
                                    <PackageX size={48} className="mb-4" />
                                    <h3 className="text-xl font-bold text-white">No products found</h3>
                                    <button onClick={() => { setSearch(""); setSelectedCategory("All"); }} className="mt-4 text-indigo-400 font-semibold hover:underline">Clear all filters</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Products;