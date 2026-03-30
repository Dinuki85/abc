import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              EduConnect
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</Link>
            <Link href="/classes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Classes</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Gallery</Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Blog</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</Link>
            <Link href="/admin" className="ml-4 px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              Admin Portal
            </Link>
          </div>
          {/* Mobile menu button could go here */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-700 p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
