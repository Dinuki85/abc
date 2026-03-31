"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Shield, Cross, Theater, BadgeCheck, Users, Lightbulb, ArrowRight } from 'lucide-react';

export default function ClubsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Co-Curricular' },
    { label: 'Club & Society' },
  ];

  const clubs = [
    {
      id: 1,
      title: 'Cadet Platoon',
      motto: 'For School Honor',
      image: '/img/blog-1.jpg',
      icon: <Shield className="w-8 h-8 text-primary" />,
      description: 'The Sri Lanka Cadet Corps (SLCC) is a youth organization in Sri Lanka that aims to develop leadership, discipline, and patriotism among students. The Cadet Platoon within a school is a unit of the SLCC where students undergo military training and participate in various activities to instill values of duty, honor, and service.',
    },
    {
      id: 2,
      title: 'St. John Ambulance',
      motto: 'For School Honor',
      image: '/img/blog-2.jpg',
      icon: <Cross className="w-8 h-8 text-primary" />,
      description: 'The St. John Ambulance cadet division trains students in essential first-aid and emergency response skills. Our dedicated volunteers provide medical support during school events and learn crucial life-saving techniques.',
    },
    {
      id: 3,
      title: 'Drama Club',
      motto: 'For School Honor',
      image: '/img/blog-3.jpg',
      icon: <Theater className="w-8 h-8 text-primary" />,
      description: 'A creative space where students can express themselves through acting, scriptwriting, and stage production. The club regularly puts on performances that showcase the immense theatrical talent within our school community.',
    },
    {
      id: 4,
      title: 'Prefects Guild',
      motto: 'For School Honor',
      image: '/img/blog-1.jpg',
      icon: <BadgeCheck className="w-8 h-8 text-primary" />,
      description: 'The backbone of student leadership and school discipline. Prefects are chosen for their exemplary behavior and academic excellence, entrusted with maintaining order and organizing major school functions.',
    },
    {
      id: 5,
      title: 'Past Pupils Association',
      motto: 'For School Honor',
      image: '/img/blog-2.jpg',
      icon: <Users className="w-8 h-8 text-primary" />,
      description: 'Connecting generations of AMV alumni to support and uplift their alma mater. The association actively funds scholarships, infrastructure development, and student welfare programs.',
    },
    {
      id: 6,
      title: 'Innovation Club',
      motto: 'For School Honor',
      image: '/img/blog-3.jpg',
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      description: 'Fostering a mindset of problem-solving and technological advancement. Students engage in robotics, coding, and creative engineering projects to prepare for a technology-driven future.',
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <PageHeader 
        title="Our Clubs and Society" 
        description="We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities."
        breadcrumbs={breadcrumbs}
      />

      <section className="container-custom py-16">
        <Reveal>
          <SectionTitle subtitle="AMV Clubs" title="Our Clubs" alignment="center" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {clubs.map((club, index) => (
            <Reveal key={club.id} delay={index * 0.1}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-professional-hover transition-all duration-300 h-full flex flex-col border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <Image 
                    src={club.image} 
                    alt={club.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent z-20 flex items-end">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg -mb-10 mr-4">
                      {club.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 pt-12 flex-grow flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold font-handlee text-dark mb-2 leading-snug group-hover:text-primary transition-colors">
                    {club.title}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    <span>{club.motto}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                    {club.description}
                  </p>
                  
                  <Link 
                    href="#" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-secondary/20 text-dark font-bold text-sm hover:bg-secondary transition-all duration-300 w-full mt-auto"
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

        {/* Pagination */}
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
