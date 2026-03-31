import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Globe
} from 'lucide-react';

const FacebookIcon = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 1. Header Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 border-[20px] border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Contact Us</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto italic leading-relaxed">
            We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities.
          </p>
        </div>
      </section>

      {/* 2. Map Section */}
      <section className="w-full h-[500px] relative mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-gray-200">
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
      </section>

      {/* 3. Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Form Column */}
            <div className="lg:w-7/12 space-y-12">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-1 bg-primary"></div>
                     <span className="text-primary font-black uppercase tracking-widest text-sm italic">Get In Touch</span>
                  </div>
                  <h2 className="text-5xl font-black text-dark tracking-tight uppercase">Contact Us For Any Query</h2>
                  <p className="text-gray-500 font-medium text-lg max-w-2xl">
                    Whether you have questions about admissions, events, or our academic programs, our team is ready to assist you.
                  </p>
               </div>

               <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-light p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100">
                  <Input label="Your Name" placeholder="Jane Doe" id="name" className="bg-white" />
                  <Input label="Your Email" type="email" placeholder="jane@example.com" id="email" className="bg-white" />
                  <div className="md:col-span-2">
                    <Input label="Subject" placeholder="General Inquiry" id="subject" className="bg-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-black text-dark uppercase tracking-widest mb-2" htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      rows={6} 
                      className="block w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none font-medium" 
                      placeholder="Your message goes here..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <Button type="button" className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest px-12 py-5 rounded-full flex items-center justify-center gap-2 group shadow-xl">
                      Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </div>
               </form>
            </div>

            {/* Info Column */}
            <div className="lg:w-5/12 space-y-10 flex flex-col justify-center">
               <div className="bg-primary p-12 rounded-[3.5rem] shadow-2xl space-y-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125"></div>
                  
                  <div className="space-y-6 relative z-10">
                     <h3 className="text-3xl font-black text-white uppercase tracking-tight italic">Contact Details</h3>
                     <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                           <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/10">
                              <MapPin className="text-secondary" size={28} />
                           </div>
                           <div className="space-y-1">
                              <h5 className="text-secondary font-black text-xs uppercase tracking-widest">Address</h5>
                              <p className="text-white text-lg font-bold">WP/NG Andiambalama MV, Andiambalama.</p>
                           </div>
                        </div>

                        <div className="flex gap-6 items-start">
                           <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/10">
                              <Mail className="text-secondary" size={28} />
                           </div>
                           <div className="space-y-1">
                              <h5 className="text-secondary font-black text-xs uppercase tracking-widest">Email</h5>
                              <p className="text-white text-lg font-bold">negzonal.ka1374@gmail.com</p>
                           </div>
                        </div>

                        <div className="flex gap-6 items-start">
                           <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/10">
                              <Phone className="text-secondary" size={28} />
                           </div>
                           <div className="space-y-1">
                              <h5 className="text-secondary font-black text-xs uppercase tracking-widest">Phone</h5>
                              <p className="text-white text-lg font-bold">+94 11 22 59 249</p>
                           </div>
                        </div>

                        <div className="flex gap-6 items-start">
                           <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/10">
                              <Clock className="text-secondary" size={28} />
                           </div>
                           <div className="space-y-1">
                              <h5 className="text-secondary font-black text-xs uppercase tracking-widest">Opening Hours</h5>
                              <p className="text-white text-lg font-bold">Mon - Fri: 07:00 AM - 02:00 PM</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                     <p className="text-white/60 font-black text-xs uppercase tracking-widest">Follow Us</p>
                     <div className="flex gap-4">
                        <a href="https://www.facebook.com/AndiambalamaMV" className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-primary transition-all">
                           <FacebookIcon size={24} />
                        </a>
                        <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-primary transition-all">
                           <Globe size={24} />
                        </a>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
