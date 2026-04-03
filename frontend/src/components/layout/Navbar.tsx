'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown, X, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Academics', href: '/classes' },
    { name: 'News & Events', href: '/news' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const coCurricularLinks = [
    { name: 'Sports', href: '/co-curricular/sports' },
    { name: 'Club & Society', href: '/co-curricular/clubs' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-md py-4'
      } border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 flex-shrink-0">
          <img src="/img/favicon.png" alt="AMV Logo" className="w-full h-full object-contain" />
      
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary font-handlee leading-tight">AMV</span>
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase truncate max-w-[120px]">Andiambalama MV</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-md transition-all duration-200 ${
                  pathname === link.href 
                    ? 'text-primary bg-primary/5' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-600 group-hover:text-primary transition-all rounded-md">
                Co-Curricular <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                <div className="py-2">
                  {coCurricularLinks.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-md transition-all duration-200 ${
                pathname === '/contact' 
                  ? 'text-primary bg-primary/5' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Contact Us
            </Link>
            
            <div className="pl-4">
              <Link href="/login">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <LogIn size={18} />
                  Login
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-50 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold uppercase ${
                    pathname === link.href ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Co-Curricular</p>
                {coCurricularLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 font-medium hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold uppercase mt-2 ${
                    pathname === '/contact' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
              <div className="pt-6">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-md">
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
