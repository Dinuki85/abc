"use client";

import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send
} from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      <PageHeader 
        title="Contact Us" 
        description="We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning, growth & exciting opportunities."
      />

      {/* Map Section */}
      <section className="container-custom -mt-10 relative z-20 mb-16">
        <Reveal>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-professional border-4 border-white bg-white">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15833.866042426775!2d79.89401804779533!3d7.187488735081576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ef9985e6186b%3A0x5291ee57385c43c9!2sAndiambalama%20Maha%20Vidyalaya!5e0!3m2!1sen!2slk!4v1713433108244!5m2!1sen!2slk" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             />
          </div>
        </Reveal>
      </section>

      {/* Contact Form & Info */}
      <section className="container-custom py-10">
        <Reveal>
          <SectionTitle subtitle="Get In Touch" title="Contact Us For Any Query" alignment="center" />
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 mt-16">
          
          {/* Form Column */}
          <div className="lg:w-2/3">
            <Reveal delay={0.2}>
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-professional border border-gray-100 h-full">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Your Name" placeholder="Jane Doe" id="name" className="bg-gray-50 border-gray-200" />
                  <Input label="Your Email" type="email" placeholder="jane@example.com" id="email" className="bg-gray-50 border-gray-200" />
                  <div className="md:col-span-2">
                    <Input label="Subject" placeholder="General Inquiry" id="subject" className="bg-gray-50 border-gray-200" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="message">MESSAGE *</label>
                    <textarea 
                      id="message" 
                      rows={6} 
                      className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" 
                      placeholder="Your message goes here..."
                      required
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <Button type="button" size="lg" className="w-full md:w-auto px-10 gap-2">
                      Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

          {/* Info Column */}
          <div className="lg:w-1/3">
            <Reveal delay={0.4}>
              <div className="bg-primary p-10 rounded-3xl shadow-professional relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="relative z-10 space-y-10">
                  <h3 className="text-3xl font-bold font-handlee text-white mb-2">Our Details & Support</h3>
                  <p className="text-white/80 font-medium leading-relaxed">
                    Labore sea amet kasd diam justo amet ut vero justo. Ipsum ut et kasd duo sit, ipsum sea et erat est dolore.
                  </p>
                  
                  <div className="space-y-8 mt-8">
                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <MapPin className="text-white group-hover:text-primary transition-colors" size={24} />
                      </div>
                      <div>
                        <h5 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Address</h5>
                        <p className="text-white font-medium">WP/NG Andiambalama MV,<br />Andiambalama.</p>
                      </div>
                    </div>

                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <Mail className="text-white group-hover:text-primary transition-colors" size={24} />
                      </div>
                      <div>
                        <h5 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Email</h5>
                        <p className="text-white font-medium break-all">negzonal.ka1374@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <Phone className="text-white group-hover:text-primary transition-colors" size={24} />
                      </div>
                      <div>
                        <h5 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Phone</h5>
                        <p className="text-white font-medium">+94 11 22 59 249</p>
                      </div>
                    </div>

                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <Clock className="text-white group-hover:text-primary transition-colors" size={24} />
                      </div>
                      <div>
                        <h5 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Opening Hours</h5>
                        <p className="text-white font-medium">Mon - Fri: 07:00 AM - 02:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

    </main>
  );
}
