'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/img/favicon.png" 
                alt="AMV Logo" 
                width={60} 
                height={60} 
                className="rounded-circle"
              />
              <span className="text-4xl font-bold text-primary">AMV</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm">About us</Link>
            <Link href="/classes" className="text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm">Academics</Link>
            <Link href="/news" className="text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm">News & Events</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm">Gallery</Link>
            
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                Co-Curricular <ChevronDown size={16} />
              </button>
              <div 
                className={`absolute left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white font-medium">Sports</Link>
                <Link href="/societies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white font-medium">Club & Society</Link>
              </div>
            </div>
            
            <Link href="/contact" className="text-gray-700 hover:text-primary font-bold transition-colors uppercase text-sm">Contact Us</Link>
            
            <Link href="/login" className="px-6 py-2 rounded-md bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-sm">
              Log in
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 shadow-inner">
          <Link href="/" className="block py-2 text-gray-700 font-bold uppercase text-sm">Home</Link>
          <Link href="/about" className="block py-2 text-gray-700 font-bold uppercase text-sm">About us</Link>
          <Link href="/classes" className="block py-2 text-gray-700 font-bold uppercase text-sm">Academics</Link>
          <Link href="/news" className="block py-2 text-gray-700 font-bold uppercase text-sm">News & Events</Link>
          <Link href="/gallery" className="block py-2 text-gray-700 font-bold uppercase text-sm">Gallery</Link>
          <div className="py-2 border-t border-gray-50 mt-2">
            <p className="text-gray-400 font-bold uppercase text-xs mb-2">Co-Curricular</p>
            <Link href="/blog" className="block py-2 pl-4 text-gray-700 font-medium text-sm">Sports</Link>
            <Link href="/societies" className="block py-2 pl-4 text-gray-700 font-medium text-sm">Club & Society</Link>
          </div>
          <Link href="/contact" className="block py-2 text-gray-700 font-bold uppercase text-sm">Contact Us</Link>
          <Link href="/login" className="block py-3 mt-4 text-center rounded-md bg-primary text-white font-bold uppercase text-sm">
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
