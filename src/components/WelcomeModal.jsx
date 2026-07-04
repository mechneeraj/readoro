import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the modal in this session to prevent it from popping up on every refresh
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    
    if (!hasSeenModal) {
      // Small delay to allow the page to render first before showing the modal
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenWelcomeModal', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Header */}
        <div className="bg-brand-600 p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Sparkles className="w-24 h-24 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white relative z-10">Welcome to READORA!</h2>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Area - Easily changeable per requirements */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-brand-600" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Discover Your Next Masterpiece
          </h3>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            We are thrilled to have you here! Explore our carefully curated collections of award-winning books, famous recommendations, and hidden gems.
          </p>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
