import React from 'react';
import { Layout, Music, Monitor, Theater, FlaskConical, Library } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const facilities = [
  { title: 'Play Ground', desc: 'A vibrant space where students can unleash their imagination, develop social skills, and engage in healthy physical activity.', icon: <Layout className="text-primary w-12 h-12" /> },
  { title: 'Aesthetic Units', desc: 'offer students a dynamic platform to explore the world by getting experiences from different types of art, music, drama & Theater, and dance.', icon: <Music className="text-primary w-12 h-12" /> },
  { title: 'Smart Classroom', desc: 'opportunities for learning and exploration, where technology meets education to inspire, engage, and empower the leaders of tomorrow.', icon: <Monitor className="text-primary w-12 h-12" /> },
  { title: 'Auditoriums', desc: 'Our Indoor, Outdoor Auditoriums serves as dynamic hubs for creativity, performance, and community gatherings.', icon: <Theater className="text-primary w-12 h-12" /> },
  { title: 'laboratories', desc: "Our Mahindodaya and other STEM laboratories provide hands-on experiences that ignite student's passion for inquiry and innovation.", icon: <FlaskConical className="text-primary w-12 h-12" /> },
  { title: 'Library, Learning Units', desc: 'where the pursuit of knowledge knows no bounds and every student has the opportunity to reach their fullest potential.', icon: <Library className="text-primary w-12 h-12" /> }
];

export default function Facilities() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Excellence</span>
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-dark font-handlee">School Facilities</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, i) => (
            <Reveal key={i} width="100%" delay={i * 0.1}>
              <div className="group bg-white hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-xl border border-gray-100 rounded-3xl p-10 mb-4 h-full flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-white/10 transition-colors"></div>
                <div className="mb-6 p-4 rounded-2xl bg-primary/5 group-hover:bg-white/20 transition-colors transform group-hover:scale-110 group-hover:rotate-6 duration-500 shadow-inner">
                  {React.cloneElement(facility.icon as React.ReactElement<{ className?: string }>, { className: 'w-12 h-12 text-primary group-hover:text-white transition-colors duration-500' })}
                </div>
                <div className="space-y-3 relative z-10">
                  <h4 className="text-2xl font-bold text-dark group-hover:text-white transition-colors duration-500 font-handlee">
                    {facility.title.split('&').map((p, idx, arr) => (
                      <React.Fragment key={idx}>
                        {p}
                        {idx < arr.length - 1 && <span className="text-primary group-hover:text-white mx-1 font-handlee">&</span>}
                      </React.Fragment>
                    ))}
                  </h4>
                  <div className="w-12 h-1 bg-primary/20 group-hover:bg-white/40 mx-auto rounded-full transition-all duration-500 group-hover:w-20"></div>
                  <p className="text-gray-600 group-hover:text-white/90 text-center leading-relaxed font-medium transition-colors duration-500">
                    {facility.desc.split('&').map((p, idx, arr) => (
                      <React.Fragment key={idx}>
                        {p}
                        {idx < arr.length - 1 && <span className="text-primary group-hover:text-white mx-1 font-bold">&</span>}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
