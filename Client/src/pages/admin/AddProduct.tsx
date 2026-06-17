import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Upload, Loader2, X, Tag } from "lucide-react";
import { addProduct } from "../../services/product.service";
import { uploadImage } from "../../services/upload.service";
import { getCategories } from "../../services/category.service";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [preview, setPreview] = useState("");
    const [formData, setFormData] = useState({ name: "", category: "", description: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!imageFile) return toast.error("Please upload an image");
        if (!formData.category) return toast.error("Please select a category");

        setLoading(true);
        try {
            // 1. Upload image first
            const imageFormData = new FormData();
            imageFormData.append("image", imageFile);
            const { imageUrl } = await uploadImage(imageFormData);

            // 2. Send product data with imageUrl
            await addProduct({
                ...formData,
                image: imageUrl
            });

            toast.success("Product Added Successfully!");

            // Reset form
            setFormData({ name: "", category: "", description: "" });
            setPreview("");
            setImageFile(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-indigo-900/10">
            
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
                    <Tag size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Add New Product</h1>
                    <p className="text-sm text-zinc-400">Create a new item for your wellness catalog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Product Name Input */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Product Name</label>
                    <input
                        type="text"
                        placeholder="e.g., Aahar Tealite 500 Gms"
                        value={formData.name}
                        className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                {/* Category Select */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Category</label>
                    <select
                        className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 [&>option]:bg-zinc-900"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    >
                        <option value="" disabled className="text-zinc-500">Select Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Image Upload Box */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Product Image</label>
                    <div className="group relative rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center transition-all hover:border-indigo-500/50 hover:bg-zinc-900/80">
                        {preview ? (
                            <div className="relative inline-block">
                                <img src={preview} alt="Preview" className="mx-auto h-40 w-auto rounded-xl border border-zinc-700 object-contain bg-black p-2 shadow-lg" />
                                <button
                                    type="button"
                                    onClick={() => { setPreview(""); setImageFile(null); }}
                                    className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="block cursor-pointer">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-indigo-500/20 group-hover:text-indigo-400">
                                    <Upload size={28} />
                                </div>
                                <span className="block text-sm font-medium text-zinc-300">Click to upload product image</span>
                                <span className="mt-1 block text-xs text-zinc-500">PNG, JPG, WEBP up to 5MB</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setPreview(URL.createObjectURL(e.target.files[0]));
                                            setImageFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Description Textarea */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Description</label>
                    <textarea
                        placeholder="Describe the product details and benefits..."
                        rows={4}
                        value={formData.description}
                        className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button 
                    disabled={loading} 
                    className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : "Publish Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;