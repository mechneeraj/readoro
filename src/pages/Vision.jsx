import { Sparkles, Eye, Target } from 'lucide-react';

export default function Vision() {
  return (
    <div className="pt-16 pb-24 min-h-screen bg-white">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          Our Mission
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
          Spreading the Joy of <span className="text-brand-600">Reading</span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-16">
          We envision a world where every individual has access to stories that inspire, educate, and transform. Reading is not just a hobby; it is a fundamental human right to explore the universe through the minds of others.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div className="order-2 md:order-1">
            <div className="aspect-square rounded-3xl bg-slate-50 overflow-hidden relative border border-slate-100">
              {/* Decorative elements representing abstract imagination */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-100/50 to-purple-100/50"></div>
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-brand-400 rounded-full mix-blend-multiply filter blur-[64px] opacity-40"></div>
              <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full mix-blend-multiply filter blur-[64px] opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-32 h-32 text-brand-600/20" />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-50 rounded-xl">
                  <Target className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Democratizing Knowledge</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg pl-[68px]">
                We believe that great ideas and knowledge should be accessible to everyone. By making book discovery simple, personalized, and inclusive, we help every reader find books that inspire, educate, and transform their perspective—regardless of their background or experience.              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Curating Brilliance</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg pl-[68px]">
                In an era of information overload, we focus on signal over noise. Our vision is to be the trusted beacon guiding you toward literary brilliance and award-winning masterpieces.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
