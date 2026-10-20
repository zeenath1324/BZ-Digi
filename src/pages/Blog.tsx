import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/agencyData';
import { Sparkles, Clock, ArrowUpRight, Search } from 'lucide-react';

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Design & UX', 'Performance Marketing', 'Search Engine Optimization', 'Brand Strategy'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE MEMORANDUM & EDITORIAL</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
              Intelligence for <br />
              <span className="gold-gradient-text">Modern Category Titans.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#B6B0A4] leading-relaxed">
              Forensic essays, technical architecture breakdowns, and macroeconomic media buying playbooks from our senior partners.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-display ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] shadow-[0_0_15px_rgba(214,184,120,0.3)]'
                  : 'bg-[#151515] border border-[#383126] text-[#B6B0A4] hover:text-[#F5F1E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B6B0A4]" />
          <input
            type="text"
            placeholder="Search essays & insights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151515] border border-[#383126] text-xs text-[#F5F1E8] placeholder-[#B6B0A4]/50 focus:border-[#D6B878] focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-3xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#B6B0A4] mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#1C1A16] text-[#D6B878] border border-[#383126]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#D6B878]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors mb-4 leading-snug">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-[#B6B0A4] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#383126]/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#F5F1E8]">
                    {post.author.name}
                  </div>
                  <div className="text-[10px] text-[#B6B0A4]">
                    {post.author.role} • {post.date}
                  </div>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D6B878] group-hover:text-[#F0DDAA] transition-colors font-display"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};
