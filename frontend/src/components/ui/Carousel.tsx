'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export default function Carousel({ 
  children, 
  showDots = true, 
  autoPlay = false, 
  interval = 5000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 }
}: CarouselProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const controls = useAnimationControls();
  
  // Clone children for infinite loop: [End of original] [Original] [Start of original]
  // For simplicity, we just triple the array: [C1, C2, C3] -> [C1, C2, C3, C1, C2, C3, C1, C2, C3]
  // We start at the middle set.
  const originalCount = children.length;
  const displayItems = [...children, ...children, ...children];

  const getVisibleCount = useCallback(() => {
    if (windowWidth < 640) return itemsPerView.mobile;
    if (windowWidth < 1024) return itemsPerView.tablet;
    return itemsPerView.desktop;
  }, [windowWidth, itemsPerView]);

  const visibleCount = getVisibleCount();
  const itemWidth = 100 / visibleCount;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set initial position to the middle clone
  useEffect(() => {
    setCurrentIndex(originalCount);
  }, [originalCount]);

  const handleNext = useCallback(async () => {
    if (!isTransitioning) return;
    
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    // If we've reached the end of the second set, jump back to the first set
    if (nextIndex >= originalCount * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(originalCount);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Wait for animation to finish
    }
  }, [currentIndex, originalCount, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (!isTransitioning) return;
    
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);

    if (prevIndex < originalCount) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(originalCount * 2 - 1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    }
  }, [currentIndex, originalCount, isTransitioning]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(handleNext, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, handleNext]);

  return (
    <div className="relative group w-full overflow-hidden pb-12">
      {/* Container */}
      <motion.div 
        className="flex"
        animate={{ x: `-${currentIndex * itemWidth}%` }}
        transition={isTransitioning ? { type: "spring", stiffness: 200, damping: 25 } : { duration: 0 }}
      >
        {displayItems.map((child, i) => (
          <div 
            key={i} 
            className="px-4 shrink-0"
            style={{ width: `${itemWidth}%` }}
          >
            {child}
          </div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 z-20">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots (Synchronized with original items) */}
      {showDots && originalCount > visibleCount && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3">
          {Array.from({ length: originalCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(originalCount + i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                (currentIndex % originalCount) === i 
                  ? 'w-8 bg-primary shadow-sm' 
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

