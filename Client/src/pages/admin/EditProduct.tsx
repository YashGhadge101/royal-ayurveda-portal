import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Upload, Loader2, Edit3, X, Tag } from "lucide-react";
import { getProductById, updateProduct } from "../../services/product.service";
import { uploadImage } from "../../services/upload.service";
import { getCategories } from "../../services/category.service";
import type { Category } from "../../types/Category";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);
        const uploadResult = await uploadImage(uploadFormData);
        imageUrl = uploadResult.imageUrl;
      }

      await updateProduct(Number(id), { ...formData, image: imageUrl });
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [product, cats] = await Promise.all([getProductById(id!), getCategories()]);
        setFormData({
          name: product.name,
          category: product.category,
          image: product.image,
          description: product.description,
        });
        setPreview(`http://localhost:5000/uploads/${product.image}`);
        setCategories(cats);
      } catch (error) {
        toast.error("Failed to load product data");
      }
    };
    init();
  }, [id]);

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-indigo-900/10">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
            <Edit3 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Product</h1>
            <p className="text-sm text-zinc-400">Modify existing product details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Product Image</label>
            <div className="relative rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-6 text-center">
              {preview ? (
                <div className="relative inline-block">
                  <img src={preview} alt="Preview" className="h-32 w-32 rounded-xl border border-zinc-700 object-cover" />
                  <button type="button" onClick={() => { setPreview(""); setImageFile(null); }} className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-zinc-500" />
                  <span className="text-sm text-zinc-400">Upload new image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-bold text-white transition-all hover:brightness-110 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Update Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;