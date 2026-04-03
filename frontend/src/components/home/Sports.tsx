import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import Carousel from '@/components/ui/Carousel';

const sports = [
  { 
    sport: 'Cricket & Elle', 
    img: 'testimonial-1.jpg', 
    incharge: 'Mr.Sampath', 
    role: 'Incharge',
    desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and Gender Basis.'
  },
  { 
    sport: 'Netball', 
    img: 'testimonial-2.jpg', 
    incharge: 'Ms.Gayani', 
    role: 'Incharge',
    desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and only for girls.'
  },
  { 
    sport: 'Volleyball', 
    img: 'testimonial-3.jpg', 
    incharge: 'Mr.Saman', 
    role: 'Coach',
    desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and Gender Basis.'
  },
  { 
    sport: 'Taekwondo', 
    img: 'testimonial-4.jpg', 
    incharge: 'Major Rathnayaka', 
    role: 'Coach',
    desc: 'students can select Taekwondo to practice as another co-curriculer activity. Any Student can enroll without age limit and Gender Basis.'
  },
  { 
    sport: 'Karate', 
    img: 'testimonial-5.jpg', 
    incharge: 'Mr.Dias', 
    role: 'Incharge',
    desc: 'students can select Karate to practice as another co-curriculer activity. Any Student can enroll without age limit and Gender Basis.'
  }
];

export default function Sports() {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Sports</span>
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-dark font-handlee">Student Can Enroll</h1>
          </div>
        </Reveal>

        <Reveal width="100%">
          <Carousel 
            showDots={true} 
            autoPlay={true} 
            interval={4000} 
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          >
            {sports.map((sport, i) => (
              <div key={i} className="flex flex-col h-full space-y-8 px-2 py-4 group">
                <div className="bg-white shadow-professional rounded-3xl p-10 flex-grow relative border-t-4 border-white group-hover:border-primary transition-all duration-500">
                  <Quote className="text-primary w-12 h-12 mb-4" />
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold mb-4 text-gray-700 font-handlee group-hover:text-primary transition-colors">
                      {sport.sport.split('&').map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < array.length - 1 && <span className="text-primary mx-1 font-handlee">&</span>}
                        </React.Fragment>
                      ))}
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-lg font-medium line-clamp-4">{sport.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 px-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-transparent group-hover:ring-primary transition-all duration-500">
                    <Image src={`/img/${sport.img}`} alt={sport.incharge} fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-dark text-2xl font-handlee group-hover:text-primary transition-colors">{sport.incharge}</h5>
                    <p className="text-gray-500 italic text-lg font-medium">{sport.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
