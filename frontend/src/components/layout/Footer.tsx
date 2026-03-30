import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
              EduConnect
            </h3>
            <p className="text-sm text-slate-400">
              Modernizing education with seamless administrative and learning tools for students, teachers, and parents.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/classes" className="hover:text-blue-400 transition-colors">Classes & Courses</Link></li>
              <li><Link href="/gallery" className="hover:text-blue-400 transition-colors">Photo Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Latest News</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2 inline-block">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admission" className="hover:text-blue-400 transition-colors">Admissions</Link></li>
              <li><Link href="/calendar" className="hover:text-blue-400 transition-colors">Academic Calendar</Link></li>
              <li><Link href="/student-portal" className="hover:text-blue-400 transition-colors">Student Portal</Link></li>
              <li><Link href="/parents" className="hover:text-blue-400 transition-colors">Parents Guide</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start"><MapPin size={18} className="mr-2 text-blue-400 shrink-0 mt-0.5" /> <span>123 Education Lane, Tech City, ST 12345</span></li>
              <li className="flex items-center"><Phone size={18} className="mr-2 text-blue-400 shrink-0" /> <span>+1 (555) 123-4567</span></li>
              <li className="flex items-center"><Mail size={18} className="mr-2 text-blue-400 shrink-0" /> <span>info@educonnect.edu</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} EduConnect School System. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
