import { Star, X } from 'lucide-react';

export default function BookDetailsModal({ book, isOpen, onClose }) {
  if (!isOpen || !book) return null;

  const imageUrl = book.image || `/${book.cover_image}`;
  const title = book.name || book.title;
  const category = book.genre || book.category;
  
  const description = book.description || `Dive into the captivating world of "${title}" by ${book.author}. This remarkable work in the ${category} genre offers a unique and engaging experience that will keep you turning the pages. Whether you are looking for profound insights or just a great escape, this book delivers an unforgettable journey through its masterful storytelling and vivid characters.`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-700 shadow-md transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-2/5 aspect-[2/3] sm:aspect-auto">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:w-3/5 flex flex-col justify-center text-left">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                {category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-2">
              {title}
            </h2>
            <p className="text-base text-brand-600 mb-4 font-medium">By {book.author}</p>

            <div className="flex items-center gap-3 mb-6 text-sm text-slate-700">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{book.rating || '4.5'}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-600 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">{book.language || 'English'}</span>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
              {description}
            </p>

            {/* <div className="mt-auto pt-6 border-t border-slate-100 flex gap-3">
              <button className="flex-1 py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl shadow-sm shadow-brand-600/20 transition-colors">
                Read Now
              </button>
              <button className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium rounded-xl transition-colors">
                Add to List
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
