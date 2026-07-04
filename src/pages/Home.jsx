import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, User, Quote, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';
import booksData from '../data.json';
import recommendationsData from '../recommendations.json';
import exploreCollectionData from '../explore_collection.json';
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ITEMS_PER_PAGE = 15;

const HERO_SLIDES = [
  {
    id: 1,
    type: 'book',
    heading: 'Weekly Suggestion',
    book: booksData.find(b => b.category === 'Weekly Suggestions') || booksData[0]
  },
  {
    id: 2,
    type: 'quote',
    quote: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.",
    author: "George R.R. Martin"
  }
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [selectedHeroBook, setSelectedHeroBook] = useState(null);
  const [selectedRecBook, setSelectedRecBook] = useState(null);
  const scrollRef = useRef(null);
  const location = useLocation();

  // Hero Slider Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle anchor link scrolling from other pages
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Derive unique languages, authors, and genres
  const languages = useMemo(() => ['All', ...new Set(exploreCollectionData.map(b => b.language).filter(Boolean))], []);
  const authors = useMemo(() => ['All', ...new Set(exploreCollectionData.map(b => b.author).filter(Boolean))], []);
  const genres = useMemo(() => ['All', ...new Set(exploreCollectionData.map(b => b.genre).filter(Boolean))], []);

  const filteredCollection = useMemo(() => {
    return exploreCollectionData.filter(book => {
      const matchLanguage = selectedLanguage === 'All' || book.language === selectedLanguage;
      const matchAuthor = selectedAuthor === 'All' || book.author === selectedAuthor;
      const matchGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      return matchLanguage && matchAuthor && matchGenre;
    });
  }, [selectedLanguage, selectedAuthor, selectedGenre]);

  // Pagination for Explore Collection
  const totalPages = Math.ceil(filteredCollection.length / ITEMS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCollection.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredCollection]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLanguage, selectedAuthor, selectedGenre]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Dedicated data for sections
  const recommendedBooks = recommendationsData.filter(book => book.recommended_by);
  const awardBooks = booksData.filter(book => book.awards);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Image Banner with Slider */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <img src="/images/hero_image.png" alt="Library" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 flex items-center justify-center px-4 transition-all duration-1000",
                currentHeroSlide === index 
                  ? "opacity-100 translate-y-0 z-10 pointer-events-auto" 
                  : "opacity-0 translate-y-8 z-0 pointer-events-none"
              )}
            >
              {slide.type === 'book' ? (
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto">
                  <div className="relative group">
                    <img src={`/${slide.book.cover_image}`} alt={slide.book.title} className="w-48 md:w-64 rounded-xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="text-center md:text-left max-w-lg">
                    <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-300 font-semibold tracking-wider uppercase text-xs rounded-full mb-4 border border-brand-500/30">
                      {slide.heading}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                      {slide.book.title}
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 font-medium">by {slide.book.author}</p>
                    <button 
                      onClick={() => setSelectedHeroBook(slide.book)}
                      className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-brand-500/25"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-4xl mx-auto px-4">
                  <Quote className="w-16 h-16 text-brand-400/40 mx-auto mb-8" />
                  <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-8 leading-relaxed drop-shadow-md">
                    "{slide.quote}"
                  </h2>
                  <p className="text-brand-300 font-semibold tracking-wider uppercase text-sm">
                    — {slide.author}
                  </p>
                </div>
              )}
            </div>
          ))}
          
          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  currentHeroSlide === index ? "bg-brand-400 w-8" : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section id="explore" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Explore Collection</h2>
              <p className="text-slate-500">Discover all our books</p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Language</label>
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 shadow-sm"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</label>
                <select 
                  value={selectedAuthor} 
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 shadow-sm max-w-[200px]"
                >
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Genre</label>
                <select 
                  value={selectedGenre} 
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 shadow-sm max-w-[200px]"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-500 font-medium mb-6">
            Showing {filteredCollection.length} books
          </div>
          
          {filteredCollection.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {paginatedBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-lg">No books found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedLanguage('All'); setSelectedAuthor('All'); setSelectedGenre('All'); }}
                className="mt-4 px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={cn(
                      "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                      currentPage === i + 1
                        ? "bg-brand-600 text-white shadow-sm"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Famous Recommendations */}
      <section id="famous-recommendations" className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Famous Recommendations</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Books that inspired the world's most successful and influential people.
            </p>
          </div>
          
          <div className="relative group -mx-4 px-4 sm:mx-0 sm:px-0">
            <button 
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                }
              }}
              className="absolute left-6 sm:-left-4 top-[calc(50%-16px)] -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur shadow-lg border border-slate-200 text-slate-600 hover:text-brand-600 hover:bg-white transition-all duration-300 hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button 
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                }
              }}
              className="absolute right-6 sm:-right-4 top-[calc(50%-16px)] -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur shadow-lg border border-slate-200 text-slate-600 hover:text-brand-600 hover:bg-white transition-all duration-300 hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x scroll-smooth hide-scrollbar-visually">
              {recommendedBooks.map((book) => (
                <div key={`rec-${book.id}`} className="min-w-[320px] max-w-[320px] flex-none snap-start">
                  <div 
                    onClick={() => setSelectedRecBook(book)}
                    className="bg-slate-50 rounded-2xl p-6 h-full border border-slate-100 hover:border-brand-200 hover:shadow-md hover:bg-white transition-all duration-300 cursor-pointer"
                  >
                    <Quote className="w-8 h-8 text-brand-300 mb-4" />
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{book.recommended_by}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Recommends</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <img src={`/${book.cover_image}`} alt={book.title} className="w-20 h-28 object-cover rounded-lg shadow-sm" />
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight mb-1">{book.title}</h4>
                        <p className="text-sm text-slate-500">{book.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Laurels */}
      <section id="award-winners" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Awards & Laurels</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Critically acclaimed masterpieces that have won the most prestigious literary awards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awardBooks.slice(0, 6).map(book => (
              <a 
                key={`award-${book.id}`} 
                href={book.award_link || `https://www.google.com/search?q=${encodeURIComponent(book.awards + ' ' + book.title)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center gap-5 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <img src={`/${book.cover_image}`} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 text-xs font-semibold mb-2">
                    <Award className="w-3 h-3" />
                    {book.awards}
                  </div>
                  <h4 className="font-bold text-white leading-tight line-clamp-1">{book.title}</h4>
                  <p className="text-sm text-slate-400">{book.author}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendation Modal */}
      {selectedRecBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedRecBook(null)}>
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedRecBook(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <div className="flex items-start gap-6 mb-6">
                <img src={`/${selectedRecBook.cover_image}`} alt={selectedRecBook.title} className="w-24 h-36 object-cover rounded-lg shadow-md" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedRecBook.title}</h3>
                  <p className="text-brand-600 font-medium mb-4">by {selectedRecBook.author}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{selectedRecBook.recommended_by}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <Quote className="w-6 h-6 text-brand-300 mb-3" />
                <p className="text-slate-700 leading-relaxed">
                  This book is highly recommended by <span className="font-semibold">{selectedRecBook.recommended_by}</span>. 
                  They shared their insights and recommendation for this masterpiece via <span className="font-semibold text-brand-700">{selectedRecBook.recommendation_source}</span>.
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedRecBook(null)}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Book Details Modal */}
      <BookDetailsModal 
        book={selectedHeroBook} 
        isOpen={!!selectedHeroBook} 
        onClose={() => setSelectedHeroBook(null)} 
      />

    </div>
  );
}
