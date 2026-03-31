import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-dark text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative background element if needed, keeping it professional */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-4xl font-bold text-primary">AMV</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              We are thrilled to have you join us on our digital journey as we embark on our academic years fille with learning growth and exciting oppotunities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/AndiambalamaMV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-primary text-xl font-bold mb-6 uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <MapPin className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1">Address</h4>
                  <p className="text-gray-400 text-sm italic">WP/NG Andiambalama MV, Andiambalama.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm italic">negzonal.ka1374@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm italic">+94 11 22 59 249</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-primary text-xl font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Academics', href: '/classes' },
                { name: 'News & Events', href: '/news' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Sports', href: '/blog' },
                { name: 'Club & Society', href: '/societies' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Log In Form */}
          <div>
            <h3 className="text-primary text-xl font-bold mb-6 uppercase tracking-wider">Log In</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Index No" 
                className="w-full bg-white text-gray-800 border-0 px-4 py-3 rounded-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-white text-gray-800 border-0 px-4 py-3 rounded-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 transition-colors uppercase tracking-widest text-sm shadow-md"
              >
                Log In
              </button>
            </form>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-primary font-bold">WP/NG Andiambalama Maha Vidhyalaya</span>. All Rights Reserved. 
            Designed by <span className="text-primary font-bold">BIT Infortech</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
