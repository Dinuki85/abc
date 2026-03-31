'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Plus,
  Camera,
  Layers,
  Award,
  Zap,
  Filter
} from 'lucide-react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('*');

  const galleryItems = [
    { src: '/img/portfolio-1.jpg', category: 'first', label: 'Academic' },
    { src: '/img/portfolio-2.jpg', category: 'second', label: 'Celebration' },
    { src: '/img/portfolio-3.jpg', category: 'third', label: 'Achievements' },
    { src: '/img/portfolio-4.jpg', category: 'first', label: 'Academic' },
    { src: '/img/portfolio-5.jpg', category: 'second', label: 'Celebration' },
    { src: '/img/portfolio-6.jpg', category: 'third', label: 'Achievements' },
  ];

  const filters = [
    { id: '*', label: 'All', icon: <Layers size={16} /> },
    { id: 'first', label: 'Academic', icon: <Zap size={16} /> },
    { id: 'second', label: 'Celebration', icon: <Camera size={16} /> },
    { id: 'third', label: 'Achievements', icon: <Award size={16} /> },
  ];

  const filteredItems = activeFilter === '*' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 1. Header Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0%,_transparent_70%)] opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Gallery</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto italic leading-relaxed">
            We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities.
          </p>
        </div>
      </section>

      {/* 2. Gallery Section */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-black uppercase tracking-widest text-sm italic">Our Gallery</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-5xl font-black text-dark tracking-tight uppercase">Old Memories at AMV</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-lg border-2
                  ${activeFilter === f.id 
                    ? 'bg-primary border-primary text-white scale-110' 
                    : 'bg-white border-transparent text-gray-500 hover:border-primary/20 hover:text-primary'}
                `}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
            {filteredItems.map((item, i) => (
              <div 
                key={i} 
                className="relative group aspect-square rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gray-100 cursor-pointer"
              >
                <Image 
                  src={item.src} 
                  alt={item.label} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <div className="bg-white p-6 rounded-full shadow-2xl">
                         <Plus size={48} className="text-primary" />
                      </div>
                   </div>
                </div>
                <div className="absolute bottom-6 left-8 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                   <span className="bg-secondary text-dark font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {item.label}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
