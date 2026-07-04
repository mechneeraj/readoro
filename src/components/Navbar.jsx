import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Vision', path: '/vision' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 flex items-center justify-center overflow-hidden bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors p-1">
                <img src="/images/readora.png" alt="READORA Logo" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">READORA</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-600",
                  location.pathname === link.path ? "text-brand-600" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <button
                onClick={() => handleNavClick('famous-recommendations')}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                Recommendations
              </button>
              <button
                onClick={() => handleNavClick('award-winners')}
                className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-brand-600 transition-all shadow-sm hover:shadow-md"
              >
                Award Winners
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-md hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-slate-200 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-3 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('famous-recommendations')}
                className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
              >
                Famous Recommendations
              </button>
              <button
                onClick={() => handleNavClick('award-winners')}
                className="w-full text-left px-3 py-3 rounded-md text-base font-medium bg-slate-900 text-white hover:bg-brand-600"
              >
                Award Winners
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
