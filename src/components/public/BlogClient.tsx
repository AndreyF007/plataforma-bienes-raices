"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  category: string;
  createdAt: Date;
}

interface BlogClientProps {
  initialPosts: BlogPost[];
  tenantName: string;
}

export default function BlogClient({ initialPosts, tenantName }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(initialPosts.map(p => p.category));
    return ["Todas", ...Array.from(cats)];
  }, [initialPosts]);

  // Filtrado
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "Todas" || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [initialPosts, searchTerm, selectedCategory]);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <>
      {/* Search & Filter Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="w-full md:max-w-[485px] relative">
          <input 
            type="text" 
            placeholder="Buscar en el blog..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[50px] bg-transparent border-b border-black/20 dark:border-white/20 text-[16px] text-black dark:text-white placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors pb-2"
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-black dark:text-white" />
        </div>
        
        <div className="w-full md:w-auto relative">
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full md:w-auto flex items-center justify-between md:justify-center gap-2 px-6 py-3 border border-black/20 dark:border-white/20 text-[12px] uppercase tracking-[0.15em] font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            {selectedCategory === "Todas" ? "CATEGORÍAS" : selectedCategory} 
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCategoryOpen && (
            <div className="absolute right-0 top-full mt-2 w-full md:w-[250px] bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 text-[12px] uppercase tracking-[0.1em] hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${selectedCategory === cat ? 'font-bold' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-16 pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="min-w-[85vw] md:min-w-0 shrink-0 snap-center group flex flex-col">
              <article className="flex flex-col h-full cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-500">
                <div className="relative w-full pt-[70%] bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-8">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center text-neutral-400 group-hover:scale-105 transition-transform duration-700 ease-in-out">
                      {tenantName}
                    </div>
                  )}
                </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex items-center text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] text-black dark:text-white mb-4">
                  <span>{post.category}</span>
                  <span className="mx-3 w-1 h-1 rounded-full bg-black/40 dark:bg-white/40"></span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <h2 className="text-[20px] md:text-[28px] font-[family-name:var(--font-raleway)] font-light leading-[1.3] mb-4 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <div 
                  className="text-[14px] md:text-[16px] text-black dark:text-white leading-[1.8] line-clamp-3 mb-6"
                  dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }}
                />
                
                <div className="mt-auto inline-flex items-center text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] relative before:absolute before:bottom-[-4px] before:left-0 before:w-full before:h-px before:bg-black dark:before:bg-white before:scale-x-0 before:origin-right group-hover:before:scale-x-100 group-hover:before:origin-left before:transition-transform before:duration-500">
                  LEER ARTÍCULO
                </div>
              </div>
              </article>
            </Link>
          ))}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />
        </div>
      ) : (
        <div className="text-center py-20 text-black dark:text-white">
          No se encontraron artículos con esos criterios.
        </div>
      )}
    </>
  );
}
