import { Link } from 'react-router-dom';
import { BookOpen, Globe, MessageCircle, Mail, Link as LinkIcon, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="h-10 w-10 flex items-center justify-center overflow-hidden bg-slate-800 rounded-lg group-hover:bg-brand-900 transition-colors p-1">
                <img src="/images/readora.png" alt="READORA Logo" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">READORA</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Discover your next great read. A curated collection of masterpieces, award winners, and recommendations from the world's brightest minds.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 hover:text-white transition-all text-slate-400">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 hover:text-white transition-all text-slate-400">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 hover:text-white transition-all text-slate-400">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 hover:text-white transition-all text-slate-400">
                <LinkIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link to="/vision" className="hover:text-brand-400 transition-colors">Our Vision</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">New Launch</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Must Reads</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Weekly Suggestions</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Award Winners</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-semibold mb-6">Subscribe</h3>
            <p className="text-slate-400 text-sm mb-4">
              Get the latest book recommendations and news delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 bg-brand-600 hover:bg-brand-500 rounded-md text-white transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} READORA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
