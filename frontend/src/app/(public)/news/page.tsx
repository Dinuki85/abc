"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'News & Events' },
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Big Match With Kimbulapitiya Jeyaraj Pranandupulle MV',
      date: { d: 'UP', m: 'COMING', y: 'EVENT' },
      image: '/img/blog-1.jpg',
      description: 'The school Big Match is scheduled with the Brotherhood School WP/NP Kimbulapitiya Jeyaraj Pranandupulle Maha Vidhyalaya, Kimbulapitiya. School cricket team will participate in this event in the near future.',
      isUpcoming: true
    },
    {
      id: 2,
      title: 'Sinhala Hindu New Year Celebration',
      date: { d: '09', m: 'April', y: '2024' },
      image: '/img/blog-2.jpg',
      description: 'All the school academic, non-academic staff and students participate in the celebration. Throughout the celebration, traditional games and activities bring communities together in joyous camaraderie.',
      isUpcoming: false
    },
    {
      id: 3,
      title: 'Suramya Geya sanhitha 2024 Musical Program',
      date: { d: '03', m: 'March', y: '2024' },
      image: '/img/blog-3.jpg',
      description: 'An entertaining and educational classical music program was held at the school outdoor auditorium to enhance the aesthetic enjoyment of the children under the initiative of Mr. Rodney Warnakula. Several types of stage songs were sung.',
      isUpcoming: false
    },
    {
      id: 4,
      title: 'Annual Prize Giving Ceremony',
      date: { d: '15', m: 'Feb', y: '2024' },
      image: '/img/blog-1.jpg',
      description: 'Recognizing academic excellence and extracurricular achievements throughout the previous academic year. Distinguished guests distributed awards to our outstanding scholars.',
      isUpcoming: false
    },
    {
      id: 5,
      title: 'Inter-House Sports Meet 2024',
      date: { d: '28', m: 'Jan', y: '2024' },
      image: '/img/blog-2.jpg',
      description: 'Students showcased exceptional athletic prowess across track and field events. The spirit of sportsmanship and healthy competition was evident throughout the day.',
      isUpcoming: false
    },
    {
      id: 6,
      title: 'English Day Competitions',
      date: { d: '10', m: 'Dec', y: '2023' },
      image: '/img/blog-3.jpg',
      description: 'Fostering English language skills through drama, poetry, and speech competitions. Students demonstrated remarkable proficiency and confidence on stage.',
      isUpcoming: false
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <PageHeader 
        title="Latest News" 
        description="Stay updated with the latest events, celebrations, and academic achievements at Andiambalama Maha Vidyalaya."
        breadcrumbs={breadcrumbs}
      />

      <section className="container-custom py-16">
        <Reveal>
          <SectionTitle subtitle="News updates" title="Latest News and Events" alignment="center" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {newsItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-professional-hover transition-all duration-300 h-full flex flex-col border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {item.isUpcoming && (
                    <div className="absolute top-4 right-4 z-20 bg-secondary text-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md animate-pulse">
                      Upcoming
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-grow flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold font-handlee text-dark mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-xl font-bold text-primary leading-none mb-1">{item.date.d}</span>
                      <div className="flex gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        <span>{item.date.m}</span>
                        <span>{item.date.y}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-4">
                    {item.description}
                  </p>
                  
                  <Link 
                    href="#" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 w-full mt-auto"
                    onClick={(e) => e.preventDefault()}
                  >
                    Read More 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pagination Simulation */}
        <Reveal delay={0.6}>
          <div className="mt-16 flex justify-center">
            <nav className="inline-flex items-center gap-2 bg-white rounded-full p-2 shadow-sm border border-gray-100">
              <button disabled className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 cursor-not-allowed hover:bg-gray-50">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold shadow-md">
                1
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary font-bold transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary font-bold transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                &raquo;
              </button>
            </nav>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
