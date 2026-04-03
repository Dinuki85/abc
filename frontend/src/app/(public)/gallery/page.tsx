"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

type Category = 'All' | 'Academic' | 'Celebration' | 'Achievements';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories: Category[] = ['All', 'Academic', 'Celebration', 'Achievements'];

  const images = [
    { src: '/img/portfolio-1.jpg', category: 'Academic', title: 'Science Exhibition', id: 1 },
    { src: '/img/portfolio-2.jpg', category: 'Celebration', title: 'New Year Festival', id: 2 },
    { src: '/img/portfolio-3.jpg', category: 'Achievements', title: 'Sports Meet Winners', id: 3 },
    { src: '/img/portfolio-4.jpg', category: 'Academic', title: 'Library Hour', id: 4 },
    { src: '/img/portfolio-5.jpg', category: 'Celebration', title: 'Teachers Day', id: 5 },
    { src: '/img/portfolio-6.jpg', category: 'Achievements', title: 'Zonal Competitions', id: 6 },
  ];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <PageHeader 
        title="Gallery" 
        description="We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning, growth & exciting opportunities."
      />

      <section className="container-custom py-16">
        <Reveal>
          <SectionTitle subtitle="Our Gallery" title="Old Memories at AMV" alignment="center" />
        </Reveal>

        {/* Filter Buttons */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mt-10 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer aspect-video"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold font-handlee transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </h4>
                  <p className="text-sm font-medium tracking-wider uppercase mt-2 opacity-80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {img.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery view"
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-primary text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
