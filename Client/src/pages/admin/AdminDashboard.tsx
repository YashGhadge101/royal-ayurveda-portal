import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
    Package, 
    FolderTree, 
    ShieldCheck, 
    TrendingUp, 
    Loader2, 
    ArrowRight,
    LayoutDashboard
} from "lucide-react";
import { Link } from "react-router-dom";
import { getDashboardStats, getRecentProducts } from "../../services/admin.service";

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalAdmins: 0,
    });
    const [recentProducts, setRecentProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, productsData] = await Promise.all([
                    getDashboardStats(),
                    getRecentProducts()
                ]);
                setStats(statsData);
                setRecentProducts(productsData);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
                toast.error("Could not sync with server.");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-indigo-500">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p className="font-semibold text-zinc-500">Syncing Command Center...</p>
            </div>
        );
    }

    return (
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
            {/* Page Header */}
            <motion.div variants={cardVariants} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-zinc-400 mt-1">Real-time metrics and activity for your portal.</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 ring-1 ring-indigo-500/20">
                    <TrendingUp size={18} /> System Online
                </div>
            </motion.div>

            {/* Top Stat Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { label: "Total Products", value: stats.totalProducts, icon: Package, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                    { label: "Active Categories", value: stats.totalCategories, icon: FolderTree, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "System Admins", value: stats.totalAdmins, icon: ShieldCheck, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" }
                ].map((stat, i) => (
                    <motion.div key={i} variants={cardVariants} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                                <p className="mt-2 text-4xl font-extrabold text-white">{stat.value}</p>
                            </div>
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Products Table */}
            <motion.div variants={cardVariants} className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
                    <h2 className="text-xl font-bold text-white">Recently Added</h2>
                    <Link to="/admin/products" className="flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                        View Inventory <ArrowRight size={16} />
                    </Link>
                </div>
                
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-zinc-900/50 uppercase text-zinc-500">
                        <tr>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {recentProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-zinc-900/30 transition">
                                <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/admin/products/edit/${product.id}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
};

export default AdminDashboard;