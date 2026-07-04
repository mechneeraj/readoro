import { BookHeart, Users, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16 pb-24 min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            We believe that a single book can change a life. READORA was founded with a simple mission: to connect passionate readers with the world's most transformative literature.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="prose prose-lg mx-auto text-slate-600 mb-20">
          <p className="mb-6">
            In a world filled with endless scrolling and brief distractions, we wanted to create a sanctuary for deep work and profound imagination. READORA is more than just a repository; it's a carefully curated selection of the finest minds throughout history.
          </p>
          <p>
            Whether you are looking for the next gripping science fiction adventure, a philosophical masterpiece to challenge your worldview, or simply a comforting story to wind down, our collection is designed to spark joy and curiosity in every reader.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookHeart className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Curated with Love</h3>
            <p className="text-slate-500 text-sm">Every book in our collection is hand-picked by our editorial team to ensure the highest quality reading experience.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Community First</h3>
            <p className="text-slate-500 text-sm">We foster a vibrant community of readers, authors, and critics who share a profound love for the written word.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe2 className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Global Reach</h3>
            <p className="text-slate-500 text-sm">Bringing diverse voices and stories from every corner of the globe directly to your digital library.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
