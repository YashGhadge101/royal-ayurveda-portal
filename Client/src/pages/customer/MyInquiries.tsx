import { useEffect, useState } from "react";
import { getMyInquiries } from "../../services/customer.service";
import { MessageSquareText, Loader2 } from "lucide-react";

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMyInquiries();
        setInquiries(data);
      } catch (error) {
        console.error("Failed to fetch inquiries", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-8 pt-24 min-h-screen text-zinc-100">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="rounded-2xl bg-indigo-500/10 p-4 text-indigo-400 border border-indigo-500/20">
          <MessageSquareText size={28} />
        </div>
        <h1 className="text-3xl font-bold">My Inquiries</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>
      ) : (
        /* Professional Dark Table */
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 uppercase text-xs font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {inquiries.length > 0 ? inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-zinc-900/50 transition">
                  <td className="px-6 py-4 font-semibold text-indigo-400">{inquiry.product_name}</td>
                  <td className="px-6 py-4 text-zinc-400 max-w-xs truncate">{inquiry.message}</td>
                  <td className="px-6 py-4 text-zinc-500 font-mono">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-zinc-600">No inquiries found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInquiries;