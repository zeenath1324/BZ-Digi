import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#080808] min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        
        {/* Animated 404 Monogram */}
        <div className="inline-block relative mb-6">
          <span className="text-8xl sm:text-9xl font-serif-luxury font-extrabold gold-gradient-text tracking-widest">
            404
          </span>
          <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-[#D6B878] animate-ping" />
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DESTINATION OUTSIDE THE GRID</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-4">
          The Requested Coordinates Do Not Exist.
        </h1>

        <p className="text-sm text-[#B6B0A4] leading-relaxed mb-8">
          The page or dossier you are attempting to access has been archived, relocated, or requires authenticated enterprise clearance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] text-xs font-semibold uppercase tracking-wider font-display flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#151515] border border-[#383126] text-[#F5F1E8] hover:text-[#D6B878] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Explore Practices</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
