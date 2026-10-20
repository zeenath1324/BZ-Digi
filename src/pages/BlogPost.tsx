import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/agencyData';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard.');
    }
  };

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Top Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B6B0A4] hover:text-[#D6B878] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Memorandum & Insights</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-[#383126]/60">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1C1A16] text-[#D6B878] border border-[#383126]">
            {post.category}
          </span>
          <span className="text-xs text-[#B6B0A4] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D6B878]" />
            {post.readTime}
          </span>
          <span className="text-xs text-[#B6B0A4] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D6B878]" />
            {post.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-[#F0DDAA] font-light leading-relaxed mb-8">
          {post.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#383126]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1C1A16] border border-[#D6B878] flex items-center justify-center text-sm font-serif-luxury font-bold text-[#D6B878]">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="text-sm font-serif-luxury font-bold text-[#F5F1E8]">
                {post.author.name}
              </div>
              <div className="text-xs text-[#B6B0A4]">
                {post.author.role}
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-xs text-[#F5F1E8] hover:text-[#D6B878] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Executive Takeaways Box */}
        <div className="p-8 rounded-2xl bg-[#151515] border border-[#383126] mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE MEMORANDUM SUMMARY</span>
          </div>
          <div className="space-y-3">
            {post.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-[#F5F1E8]">
                <CheckCircle2 className="w-4 h-4 text-[#D6B878] flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paragraphs */}
        <div className="space-y-8 text-base sm:text-lg text-[#B6B0A4] leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="first-letter:text-4xl first-letter:font-serif-luxury first-letter:text-[#D6B878] first-letter:mr-1 first-letter:float-left">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Post Bottom Bio */}
        <div className="mt-16 p-8 rounded-2xl bg-[#101010] border border-[#383126] flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#1C1A16] border border-[#D6B878] flex items-center justify-center text-lg font-serif-luxury font-bold text-[#F0DDAA] flex-shrink-0">
            {post.author.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-base font-serif-luxury font-bold text-[#F5F1E8]">
              Authored by {post.author.name}
            </div>
            <div className="text-xs text-[#D6B878] mb-1">
              {post.author.role} at BZ Digital
            </div>
            <p className="text-xs text-[#B6B0A4]">
              Advising international luxury brands and growth stage enterprises on proprietary digital architecture and high-velocity acquisition systems.
            </p>
          </div>
        </div>

        {/* Related Reads */}
        <div className="mt-20 pt-12 border-t border-[#383126]/60">
          <h3 className="text-xl font-serif-luxury font-bold text-[#F5F1E8] mb-6">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                to={`/blog/${other.slug}`}
                className="p-6 rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-colors block group"
              >
                <div className="text-[10px] text-[#D6B878] uppercase tracking-wider mb-2 font-display">
                  {other.category} • {other.readTime}
                </div>
                <h4 className="text-base font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors line-clamp-2">
                  {other.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};
