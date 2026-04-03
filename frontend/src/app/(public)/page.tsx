import React from 'react';
import Hero from '@/components/home/Hero';
import Facilities from '@/components/home/Facilities';
import About from '@/components/home/About';
import Academic from '@/components/home/Academic';
import Enrollment from '@/components/home/Enrollment';
import Team from '@/components/home/Team';
import Sports from '@/components/home/Sports';
import Blog from '@/components/home/Blog';

/**
 * Andiambalama MV Home Page
 * Refactored into components for better performance and maintainability.
 * Each section is now a separate component in @/components/home/
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <Hero />
      <Facilities />
      <About />
      <Academic />
      <Enrollment />
      <Team />
      <Sports />
      <Blog />
    </div>
  );
}
