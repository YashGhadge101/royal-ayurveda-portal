import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, Loader2, Trash2, Package } from "lucide-react";
import { getProducts, deleteProduct } from "../../services/product.service";
import type { Product } from "../../types/Product";

const PRODUCTS_PER_PAGE = 5;

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

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

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) { console.error(error); }
    };

    const filteredProducts = useMemo(() => {
        let result = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        if (sortBy === "newest") result.sort((a, b) => b.id - a.id);
        if (sortBy === "az") result.sort((a, b) => a.name.localeCompare(b.name));
        return result;
    }, [products, search, sortBy]);

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400">
                        <Package size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Inventory</h1>
                        <p className="text-zinc-400">Manage your product catalog</p>
                    </div>
                </div>
                <Link to="/admin/products/add" className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all hover:brightness-110 active:scale-95">
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={search} 
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
                        className="w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-12 pr-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50" 
                    />
                </div>
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="rounded-2xl border border-zinc-800 bg-black px-4 text-zinc-300 outline-none focus:border-indigo-500"
                >
                    <option value="newest">Newest First</option>
                    <option value="az">A-Z</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                <table className="w-full text-left">
                    <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {loading ? (
                            <tr><td colSpan={4} className="py-10 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto" /></td></tr>
                        ) : paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <tr key={product.id} className="group hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-zinc-800 bg-black">
                                            <img
                                                src={`http://localhost:5000/uploads/${product.image}`}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-white">{product.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleDelete(product.id)} 
                                            className="text-zinc-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={4} className="py-10 text-center text-zinc-500">No products found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default AdminProducts;