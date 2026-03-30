import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Got a question about our educational programs or admission process? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <form className="space-y-6">
              <Input label="Full Name" placeholder="Jane Doe" id="name" />
              <Input label="Email Address" type="email" placeholder="jane@example.com" id="email" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="block w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 outline-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button type="button" className="w-full">Send Message</Button>
            </form>
          </div>

          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our support team is available during regular school hours to assist with any inquiries you may have.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-600">
                  <MapPin size={24} />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-slate-900">Address</h4>
                <p className="mt-1 text-slate-600">123 Education Lane<br />Tech City, ST 12345</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600">
                  <Phone size={24} />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-slate-900">Phone</h4>
                <p className="mt-1 text-slate-600">+1 (555) 123-4567<br />Mon-Fri 8am to 5pm</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-100 text-rose-600">
                  <Mail size={24} />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-slate-900">Email</h4>
                <p className="mt-1 text-slate-600">info@educonnect.edu<br />Support normally responds within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
