import { useEffect, useState } from "react";
import { getInquiries, deleteInquiry } from "../../services/inquiry.service";
import { Trash2, MessageSquareText, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInquiries();
      setInquiries(data);
    } catch (error) {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      toast.success("Inquiry removed");
    } catch (error) {
      toast.error("Failed to delete inquiry");
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400">
          <MessageSquareText size={24} />
        </div>
        <h1 className="text-3xl font-bold text-white">Customer Inquiries</h1>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Message</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {inquiries.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-900/30 transition">
                  <td className="p-4">
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-zinc-500">{item.email}</div>
                  </td>
                  <td className="p-4 text-zinc-300">{item.phone}</td>
                  <td className="p-4 text-indigo-400">{item.product_name}</td>
                  <td className="p-4 max-w-xs truncate text-zinc-400">{item.message}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {inquiries.length === 0 && (
            <div className="p-12 text-center text-zinc-500">No new inquiries.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminInquiries;