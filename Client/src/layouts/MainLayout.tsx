import { Outlet, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    // THE FIX: Flexbox column layout ensures the footer always stays at the bottom
    <div className="flex min-h-screen flex-col bg-black font-sans text-zinc-100">
      
      <Navbar />

      {/* Main content grows to take available space (flex-1) */}
      <main className="flex-1 bg-black pt-0">
        <Outlet />
      </main>

      {/* Royal Theme Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            
            {/* Brand Section */}
            <div>
              <Link to="/" className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
                {/* Indigo icon to match the new theme */}
                <ShieldCheck size={28} className="text-indigo-500" />
                <span className="text-white">MI Business</span>
              </Link>

              <p className="mt-4 text-zinc-400 leading-relaxed">
                Your trusted destination for premium wellness products and business opportunities.
              </p>
            </div>

            {/* Quick Links Section - Now actually functional! */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Quick Links
              </h3>

              <ul className="space-y-3 text-zinc-400">
                <li>
                  <Link to="/" className="transition-colors hover:text-indigo-400">Home</Link>
                </li>
                <li>
                  <Link to="/products" className="transition-colors hover:text-indigo-400">Products</Link>
                </li>
                <li>
                  <Link to="/about" className="transition-colors hover:text-indigo-400">About</Link>
                </li>
                <li>
                  <Link to="/contact" className="transition-colors hover:text-indigo-400">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Section - Added functional 'mailto' and 'tel' links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Contact
              </h3>

              <ul className="space-y-3 text-zinc-400">
                <li>
                  <a href="mailto:support@mibusiness.com" className="transition-colors hover:text-indigo-400">
                    support@mibusiness.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919876543210" className="transition-colors hover:text-indigo-400">
                    +91 9876543210
                  </a>
                </li>
                <li>
                  Maharashtra, India
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="mt-10 border-t border-zinc-800/50 pt-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} MI Business Website. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;