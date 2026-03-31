import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/classes' },
    { name: 'News & Events', href: '/news' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Sports', href: '/co-curricular/sports' },
    { name: 'Club & Society', href: '/co-curricular/clubs' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 overflow-hidden border-t-8 border-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Social */}
          <div className="space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 group">
                <span className="text-5xl font-bold text-primary font-handlee transition-transform group-hover:scale-105">AMV</span>
              </Link>
              <p className="mt-6 text-gray-400 leading-relaxed font-medium">
                We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities.
              </p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/AndiambalamaMV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-primary border border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
                aria-label="Facebook"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-white text-xl font-bold uppercase tracking-[0.2em] relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="space-y-6">
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-primary transition-colors duration-300">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1">Address</h4>
                  <p className="text-white text-sm font-medium leading-relaxed">WP/NG Andiambalama MV,<br />Andiambalama.</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-primary transition-colors duration-300">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-white text-sm font-medium break-all">negzonal.ka1374@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-primary transition-colors duration-300">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1">Phone</h4>
                  <p className="text-white text-sm font-medium">+94 11 22 59 249</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-white text-xl font-bold uppercase tracking-[0.2em] relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-bold uppercase tracking-wide"
                  >
                    <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" /> 
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Members Area */}
          <div className="space-y-8">
            <h3 className="text-white text-xl font-bold uppercase tracking-[0.2em] relative inline-block">
              Student Portal
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Access your detailed academic records, attendance, and personalized learning materials.
              </p>
              <Link href="/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary-hover text-white font-bold h-12 rounded-xl shadow-lg transition-all group flex items-center justify-center gap-2">
                  Portal Login <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest text-center md:text-left">
            &copy; {currentYear} <span className="text-primary">WP/NG Andiambalama Maha Vidhyalaya</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>Powered by</span>
            <span className="text-primary">BIT Infortech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
