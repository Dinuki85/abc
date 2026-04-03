import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

const team = [
  { name: 'A.V.D.S. AMarasena', role: 'The Principal', img: 'team-1.jpg' },
  { name: 'A.M.A.C. Adhikari', role: 'The Vise Principal', img: 'team-2.jpg' },
  { name: 'Ann Thamel Perera', role: 'The Assistant Principal', img: 'team-3.jpg' },
  { name: 'C.M. Liyanage', role: 'The Assistant Principal', img: 'team-4.jpg' }
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Our School Administrations</span>
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-dark font-handlee">Meet Our Principals</h1>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((p, i) => (
            <Reveal key={i} width="100%">
              <div className="text-center group">
                <div className="relative w-full aspect-square mb-6 rounded-full overflow-hidden shadow-sm ring-2 ring-gray-100 group-hover:ring-4 group-hover:ring-primary group-hover:ring-offset-2 transition-all duration-300">
                  <Image 
                    src={`/img/${p.img}`} 
                    alt={p.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 256px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold text-dark uppercase tracking-tight">{p.name}</h4>
                <p className="text-gray-500 italic text-sm">{p.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
