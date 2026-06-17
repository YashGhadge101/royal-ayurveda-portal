import { useEffect, useState } from "react";
import { getCategories, addCategory, deleteCategory } from "../../services/category.service";
import type { Category } from "../../types/Category";
import { Trash2, Plus, LayoutGrid, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return toast.error("Name cannot be empty");
    
    setLoading(true);
    try {
      await addCategory(name);
      setName("");
      toast.success("Category added");
      fetchCategories();
    } catch (error) {
      toast.error("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400">
          <LayoutGrid size={24} />
        </div>
        <h1 className="text-3xl font-bold text-white">Categories</h1>
      </div>

      {/* Add Category Form */}
      <div className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <input
          type="text"
          placeholder="New category name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> Add</>}
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-zinc-900/50 transition">
                <td className="p-4 text-zinc-400">#{category.id}</td>
                <td className="p-4 font-medium text-white">{category.name}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="inline-flex items-center gap-2 rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <div className="p-8 text-center text-zinc-500">No categories found.</div>
        )}
      </div>
    </section>
  );
};

export default AdminCategories;