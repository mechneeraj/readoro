import { useState } from 'react';
import { Star } from 'lucide-react';
import BookDetailsModal from './BookDetailsModal';

export default function BookCard({ book }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = book.image || `/${book.cover_image}`;
  const title = book.name || book.title;
  const category = book.genre || book.category;

  return (
    <>
      <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300">
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-800 rounded-full shadow-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-base text-slate-900 leading-tight mb-1 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-500 mb-2">{book.author}</p>

          <div className="flex items-center gap-2 mb-4">
            {book.rating ? (
              <>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-slate-700">{book.rating}</span>
              </>
            ) : (
              <span className="text-xs font-medium text-slate-600 px-2 py-0.5 bg-slate-100 rounded-md">
                {book.language || 'English'}
              </span>
            )}
          </div>

          <div className="mt-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-medium text-xs rounded-lg border border-slate-200 hover:border-brand-200 transition-all duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <BookDetailsModal 
        book={book} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
